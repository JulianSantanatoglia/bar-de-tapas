import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { menuCategories } from '../data';
import { Search, ChevronDown, ChevronUp, Users, Minus, Plus, CheckCircle2, XCircle, UtensilsCrossed } from 'lucide-react';

/**
 * Componente avanzado para dividir la cuenta entre comensales
 * Nuevo flujo: Número de comensales -> Nombres -> ¿Algo compartido? -> Seleccionar compartido -> Consumo individual -> Resumen
 */
const SplitBill = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Estados principales
  const [step, setStep] = useState('setup'); // 'setup', 'names', 'shared-question', 'shared-selection', 'individual-orders', 'summary'
  const [numberOfDiners, setNumberOfDiners] = useState(4);
  const [diners, setDiners] = useState([]);
  const [hasSharedItems, setHasSharedItems] = useState(null); // null, true, false
  const [sharedItems, setSharedItems] = useState({}); // Items compartidos seleccionados
  const [sharedParticipants, setSharedParticipants] = useState({}); // Quién participa en cada item compartido
  const [individualOrders, setIndividualOrders] = useState({}); // Pedidos individuales por comensal
  const [currentDinerIndex, setCurrentDinerIndex] = useState(0);
  const [totals, setTotals] = useState({});
  const [grandTotal, setGrandTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el buscador en pedidos individuales
  const [isExpanded, setIsExpanded] = useState({}); // Estado para categorías expandidas en pedidos individuales
  const [sharedSearchTerm, setSharedSearchTerm] = useState(''); // Estado para el buscador en elementos compartidos
  const [sharedExpanded, setSharedExpanded] = useState({}); // Estado para categorías expandidas en elementos compartidos

  // Inicializar comensales
  const initializeDiners = () => {
    const newDiners = [];
    for (let i = 0; i < numberOfDiners; i++) {
      newDiners.push({
        id: i,
        name: '',
        total: 0
      });
    }
    setDiners(newDiners);
    setStep('names');
  };

  // Manejar selección de items compartidos
  const handleSharedItemSelection = (itemId, isSelected) => {
    setSharedItems(prev => ({
      ...prev,
      [itemId]: isSelected
    }));
    
    // Si se deselecciona, limpiar participantes
    if (!isSelected) {
      setSharedParticipants(prev => {
        const newState = { ...prev };
        delete newState[itemId];
        return newState;
      });
    }
  };

  // Manejar selección de participantes para item compartido
  const handleSharedParticipantSelection = (itemId, dinerId, isParticipating) => {
    setSharedParticipants(prev => {
      const currentParticipants = prev[itemId] || [];
      let newParticipants;
      
      if (isParticipating) {
        newParticipants = [...currentParticipants, dinerId];
      } else {
        newParticipants = currentParticipants.filter(id => id !== dinerId);
      }
      
      const newState = {
        ...prev,
        [itemId]: newParticipants
      };
      
      // Si no hay participantes, eliminar el item del estado compartido
      if (newParticipants.length === 0) {
        delete newState[itemId];
        // También deseleccionar el item compartido si no tiene participantes
        setSharedItems(prevItems => {
          const newItems = { ...prevItems };
          delete newItems[itemId];
          return newItems;
        });
      }
      
      return newState;
    });
  };

  // Manejar pedidos individuales
  const handleIndividualOrder = (dinerId, itemId, quantity) => {
    const key = `${dinerId}-${itemId}`;
    const numQuantity = Math.max(0, parseInt(quantity) || 0);
    
    setIndividualOrders(prev => {
      const newOrders = { ...prev };
      
      if (numQuantity === 0) {
        // Si la cantidad es 0, eliminar el item del pedido
        delete newOrders[key];
      } else {
        // Si la cantidad es mayor a 0, actualizar el pedido
        newOrders[key] = numQuantity;
      }
      
      return newOrders;
    });
  };

  // Calcular tapas extras para un comensal
  const calculateExtraTapas = (dinerId) => {
    let bebidasCount = 0;
    let tapasCount = 0;
    
    // Contar bebidas y tapas individuales
    Object.entries(individualOrders).forEach(([key, quantity]) => {
      if (key.startsWith(`${dinerId}-`)) {
        const itemId = key.split('-').slice(1).join('-');
        
        // Buscar el item en todas las categorías y subcategorías
        let item = null;
        for (const category of Object.values(menuCategories)) {
          if (category.subcategories) {
            for (const subcategory of Object.values(category.subcategories)) {
              const foundItem = subcategory.items?.find(i => i.id === itemId);
              if (foundItem) {
                item = foundItem;
                break;
              }
            }
          } else if (category.items) {
            const foundItem = category.items.find(i => i.id === itemId);
            if (foundItem) {
              item = foundItem;
              break;
            }
          }
          if (item) break;
        }
        
        if (item) {
          if (item.category === 'bebidas') {
            bebidasCount += quantity;
          } else if (item.category === 'tapas' && item.price === 0) { // Solo tapas gratis
            tapasCount += quantity;
          }
        }
      }
    });
    
    // Las tapas gratis = número de bebidas
    // Las tapas extras = tapas totales - bebidas
    const tapasGratis = bebidasCount;
    const tapasExtras = Math.max(0, tapasCount - tapasGratis);
    
    return {
      bebidas: bebidasCount,
      tapasGratis: tapasGratis,
      tapasExtras: tapasExtras,
      precioTapasExtras: tapasExtras * 3.00
    };
  };

  // Calcular total para un comensal
  const calculateDinerTotal = (dinerId) => {
    let total = 0;
    
    // Items compartidos
    Object.entries(sharedParticipants).forEach(([itemId, participants]) => {
      if (participants.includes(dinerId)) {
        // Buscar el item en todas las categorías y subcategorías
        let item = null;
        for (const category of Object.values(menuCategories)) {
          if (category.subcategories) {
            for (const subcategory of Object.values(category.subcategories)) {
              const foundItem = subcategory.items?.find(i => i.id === itemId);
              if (foundItem) {
                item = foundItem;
                break;
              }
            }
          } else if (category.items) {
            const foundItem = category.items.find(i => i.id === itemId);
            if (foundItem) {
              item = foundItem;
              break;
            }
          }
          if (item) break;
        }
        
        if (item && participants.length > 0) {
          // Dividir el precio entre los participantes
          total += (item.price / participants.length);
        }
      }
    });
    
    // Items individuales
    Object.entries(individualOrders).forEach(([key, quantity]) => {
      if (key.startsWith(`${dinerId}-`)) {
        const itemId = key.split('-').slice(1).join('-');
        
        // Buscar el item en todas las categorías y subcategorías
        let item = null;
        for (const category of Object.values(menuCategories)) {
          if (category.subcategories) {
            for (const subcategory of Object.values(category.subcategories)) {
              const foundItem = subcategory.items?.find(i => i.id === itemId);
              if (foundItem) {
                item = foundItem;
                break;
              }
            }
          } else if (category.items) {
            const foundItem = category.items.find(i => i.id === itemId);
            if (foundItem) {
              item = foundItem;
              break;
            }
          }
          if (item) break;
        }
        
        if (item) {
          total += item.price * quantity;
        }
      }
    });
    
    // Agregar tapas extras calculadas automáticamente
    const tapasInfo = calculateExtraTapas(dinerId);
    total += tapasInfo.precioTapasExtras;
    
    return total;
  };

  // Actualizar totales cuando cambian los datos
  useEffect(() => {
    if (!diners || diners.length === 0) return;
    
    const newTotals = {};
    let grandTotalCalc = 0;
    
    diners.forEach(diner => {
      const total = calculateDinerTotal(diner.id);
      newTotals[diner.id] = total;
      grandTotalCalc += total;
    });
    
    setTotals(newTotals);
    setGrandTotal(grandTotalCalc);
    
    // Actualizar el total del comensal en el array
    setDiners(prev => prev.map(diner => ({
      ...diner,
      total: newTotals[diner.id] || 0
    })));
  }, [sharedItems, sharedParticipants, individualOrders, diners]);

  // Resetear el componente cuando se navega a otra página
  useEffect(() => {
    const handleBeforeUnload = () => {
      resetAll();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Resetear cuando se navega fuera de la página de dividir cuenta
  useEffect(() => {
    if (location.pathname !== '/dividir-cuenta') {
      resetAll();
    }
  }, [location.pathname]);

  // Actualizar nombre del comensal
  const updateDinerName = (index, name) => {
    // Limitar a máximo 10 caracteres
    const truncatedName = name.slice(0, 10);
    setDiners(prev => prev.map((diner, i) => 
      i === index ? { ...diner, name: truncatedName } : diner
    ));
  };

  // Siguiente comensal en pedidos individuales
  const nextDiner = () => {
    if (currentDinerIndex < diners.length - 1) {
      setCurrentDinerIndex(currentDinerIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setStep('summary');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Comensal anterior en pedidos individuales
  const previousDiner = () => {
    if (currentDinerIndex > 0) {
      setCurrentDinerIndex(currentDinerIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Resetear todo
  const resetAll = () => {
    setStep('setup');
    setNumberOfDiners(4);
    setDiners([]);
    setHasSharedItems(null);
    setSharedItems({});
    setSharedParticipants({});
    setIndividualOrders({});
    setCurrentDinerIndex(0);
    setTotals({});
    setGrandTotal(0);
  };

  // Obtener productos detallados de un comensal
  const getDinerProducts = (dinerId) => {
    const products = [];
    
    // Items compartidos
    Object.entries(sharedParticipants).forEach(([itemId, participants]) => {
      if (participants.includes(dinerId)) {
        // Buscar el item en todas las categorías y subcategorías
        let item = null;
        for (const category of Object.values(menuCategories)) {
          if (category.subcategories) {
            for (const subcategory of Object.values(category.subcategories)) {
              const foundItem = subcategory.items?.find(i => i.id === itemId);
              if (foundItem) {
                item = foundItem;
                break;
              }
            }
          } else if (category.items) {
            const foundItem = category.items.find(i => i.id === itemId);
            if (foundItem) {
              item = foundItem;
              break;
            }
          }
          if (item) break;
        }
        
        if (item) {
          const pricePerPerson = item.price / participants.length;
          products.push({
            name: `${item.name} (compartido)`,
            quantity: 1,
            unitPrice: pricePerPerson,
            totalPrice: pricePerPerson,
            type: 'shared',
            totalParticipants: participants.length
          });
        }
      }
    });
    
    // Items individuales
    Object.entries(individualOrders).forEach(([key, quantity]) => {
      if (key.startsWith(`${dinerId}-`)) {
        const itemId = key.split('-').slice(1).join('-');
        
        // Buscar el item en todas las categorías y subcategorías
        let item = null;
        for (const category of Object.values(menuCategories)) {
          if (category.subcategories) {
            for (const subcategory of Object.values(category.subcategories)) {
              const foundItem = subcategory.items?.find(i => i.id === itemId);
              if (foundItem) {
                item = foundItem;
                break;
              }
            }
          } else if (category.items) {
            const foundItem = category.items.find(i => i.id === itemId);
            if (foundItem) {
              item = foundItem;
              break;
            }
          }
          if (item) break;
        }
        
        if (item) {
          const totalPrice = item.price * quantity;
          products.push({
            name: item.name,
            quantity: quantity,
            unitPrice: item.price,
            totalPrice: totalPrice,
            type: 'individual'
          });
        }
      }
    });
    
    // Agregar tapas extras calculadas automáticamente
    const tapasInfo = calculateExtraTapas(dinerId);
    if (tapasInfo.tapasExtras > 0) {
      products.push({
        name: `Tapas Extras (${tapasInfo.tapasExtras} tapa${tapasInfo.tapasExtras > 1 ? 's' : ''})`,
        quantity: tapasInfo.tapasExtras,
        unitPrice: 3.00,
        totalPrice: tapasInfo.precioTapasExtras,
        type: 'extra-tapas'
      });
    }
    
    return products;
  };

  // Renderizar setup inicial - número de comensales
  const renderSetup = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="w-24 h-24 bg-restaurant-earth rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-restaurant-light-wood">
          <Users className="w-12 h-12 text-white" strokeWidth={2} />
        </div>
        <h1 className="section-title">Dividir la cuenta</h1>
        <p className="text-restaurant-text-light text-lg max-w-2xl mx-auto">
          Sistema inteligente para dividir gastos de forma justa y sencilla
        </p>
      </div>

      <div className="card p-8 md:p-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-restaurant-earth mb-2">
            ¿Cuántos comensales son?
          </h3>
          <p className="text-restaurant-text-light mb-8">
            Selecciona el número de personas en la mesa
          </p>
          
          {/* Selector moderno con grid de números */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-6 mb-6">
              <button
                onClick={() => setNumberOfDiners(Math.max(1, numberOfDiners - 1))}
                className="w-14 h-14 bg-restaurant-light-wood text-restaurant-earth rounded-xl hover:bg-restaurant-wood hover:text-white transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={numberOfDiners <= 1}
              >
                <Minus className="w-6 h-6" strokeWidth={3} />
              </button>
              
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-restaurant-earth via-restaurant-wood to-restaurant-earth rounded-2xl flex items-center justify-center shadow-2xl border-4 border-restaurant-light-wood">
                  <span className="text-6xl font-bold text-white">{numberOfDiners}</span>
                </div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-restaurant-cream px-4 py-1 rounded-full border-2 border-restaurant-wood shadow-md">
                  <span className="text-sm font-semibold text-restaurant-earth">
                    {numberOfDiners === 1 ? 'persona' : 'personas'}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => setNumberOfDiners(Math.min(10, numberOfDiners + 1))}
                className="w-14 h-14 bg-restaurant-light-wood text-restaurant-earth rounded-xl hover:bg-restaurant-wood hover:text-white transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={numberOfDiners >= 10}
              >
                <Plus className="w-6 h-6" strokeWidth={3} />
              </button>
            </div>
            
            {/* Indicador visual adicional con puntos */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setNumberOfDiners(num)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    numberOfDiners === num
                      ? 'bg-restaurant-earth w-8 h-3'
                      : 'bg-restaurant-light-wood hover:bg-restaurant-wood'
                  }`}
                  aria-label={`Seleccionar ${num} comensales`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="btn-secondary order-2 sm:order-1"
          >
            Cancelar
          </button>
          <button
            onClick={initializeDiners}
            className="btn-primary order-1 sm:order-2"
          >
            Continuar
          </button>
        </div>
      </div>

      {/* Pasos del proceso */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-6 text-center hover:scale-105 transition-transform">
          <div className="w-14 h-14 bg-restaurant-earth text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
            1
          </div>
          <h4 className="font-semibold text-restaurant-earth mb-1">Comensales</h4>
          <p className="text-sm text-restaurant-text-light">Define cuántos son</p>
        </div>
        <div className="card p-6 text-center hover:scale-105 transition-transform">
          <div className="w-14 h-14 bg-restaurant-light-wood text-restaurant-earth rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
            2
          </div>
          <h4 className="font-semibold text-restaurant-earth mb-1">Nombres</h4>
          <p className="text-sm text-restaurant-text-light">Asigna nombres</p>
        </div>
        <div className="card p-6 text-center hover:scale-105 transition-transform">
          <div className="w-14 h-14 bg-restaurant-light-wood text-restaurant-earth rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
            3
          </div>
          <h4 className="font-semibold text-restaurant-earth mb-1">Compartir</h4>
          <p className="text-sm text-restaurant-text-light">¿Algo compartido?</p>
        </div>
        <div className="card p-6 text-center hover:scale-105 transition-transform">
          <div className="w-14 h-14 bg-restaurant-light-wood text-restaurant-earth rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
            4
          </div>
          <h4 className="font-semibold text-restaurant-earth mb-1">Individual</h4>
          <p className="text-sm text-restaurant-text-light">Consumo personal</p>
        </div>
      </div>
    </div>
  );

  // Renderizar configuración de nombres
  const renderNames = () => (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="section-title">Nombres de los comensales</h1>
        <p className="text-restaurant-text-light">
          Asigna un nombre a cada persona para organizar mejor los pedidos
        </p>
      </div>

      <div className="card p-6">
        <div className="space-y-4">
          {diners.map((diner, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-br from-restaurant-earth to-restaurant-wood rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <input
                  type="text"
                  placeholder={`Comensal ${index + 1}`}
                  value={diner.name}
                  onChange={(e) => updateDinerName(index, e.target.value)}
                  maxLength={10}
                  className="flex-1 px-4 py-2 border border-restaurant-light-wood rounded-lg focus:ring-2 focus:ring-restaurant-earth focus:border-restaurant-earth"
                />
              </div>
              <div className="flex justify-end">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  diner.name.length >= 8 
                    ? 'bg-red-100 text-red-600' 
                    : diner.name.length >= 6 
                    ? 'bg-yellow-100 text-yellow-600' 
                    : 'bg-green-100 text-green-600'
                }`}>
                  {diner.name.length}/10 caracteres
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep('setup')}
            className="btn-secondary"
          >
            Cancelar
          </button>
          <button
            onClick={() => setStep('shared-question')}
            className="btn-primary"
            disabled={diners.some(diner => !diner.name.trim())}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );

  // Renderizar pregunta sobre items compartidos
  const renderSharedQuestion = () => (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="w-24 h-24 bg-restaurant-earth rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-restaurant-light-wood">
          <UtensilsCrossed className="w-12 h-12 text-white" strokeWidth={2} />
        </div>
        <h1 className="section-title">¿Han consumido algo a compartir?</h1>
        <p className="text-restaurant-text-light text-lg max-w-2xl mx-auto">
          Antes de registrar el consumo individual, necesitamos saber si hay elementos que se compartieron entre varias personas
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Botón Sí */}
        <button
          onClick={() => {
            setHasSharedItems(true);
            setStep('shared-selection');
          }}
          className="card p-8 hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-restaurant-earth group text-left"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-restaurant-earth rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
              <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold text-restaurant-earth mb-2">Sí, hay algo compartido</h3>
            <p className="text-restaurant-text-light text-sm">
              Raciones, jarras, botellas u otros platos que se dividieron entre comensales
            </p>
          </div>
        </button>
        
        {/* Botón No */}
        <button
          onClick={() => {
            setHasSharedItems(false);
            setCurrentDinerIndex(0);
            setStep('individual-orders');
          }}
          className="card p-8 hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-restaurant-wood group text-left"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-restaurant-light-wood rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
              <XCircle className="w-10 h-10 text-restaurant-earth" strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold text-restaurant-earth mb-2">No, todo individual</h3>
            <p className="text-restaurant-text-light text-sm">
              Cada comensal consumió únicamente productos para sí mismo
            </p>
          </div>
        </button>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setStep('names')}
          className="btn-secondary"
        >
          Volver atrás
        </button>
      </div>

      {/* Info sobre compartido */}
      <div className="card p-6 bg-restaurant-cream border-2 border-restaurant-light-wood">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-restaurant-earth rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">💡</span>
          </div>
          <div>
            <h4 className="font-bold text-restaurant-earth mb-3 text-lg">¿Qué se considera compartido?</h4>
            <ul className="text-sm text-restaurant-text space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-bold text-restaurant-wood">•</span>
                <div>
                  <strong>Raciones:</strong> Paellas, pulpo, carrillada, ensaladas grandes
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-restaurant-wood">•</span>
                <div>
                  <strong>Bebidas:</strong> Jarras de sangría, botellas de vino, jarras de cerveza
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-restaurant-wood">•</span>
                <div>
                  <strong>Postres:</strong> Tartas para compartir, helados familiares
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-restaurant-wood">•</span>
                <div>
                  <strong>Otros:</strong> Cualquier plato que se divida entre varias personas
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Renderizar selección de items compartidos
  const renderSharedSelection = () => {
    const selectedSharedItems = Object.keys(sharedItems).filter(itemId => sharedItems[itemId]);
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="section-title">Seleccionar elementos compartidos</h1>
          <p className="text-restaurant-text-light">
            Marca los elementos que van a compartir y selecciona quién participa en cada uno
          </p>
        </div>

        {/* Buscador */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-restaurant-text-light" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={sharedSearchTerm}
            onChange={(e) => setSharedSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-restaurant-light-wood rounded-xl focus:ring-2 focus:ring-restaurant-earth focus:border-restaurant-earth outline-none"
          />
        </div>

        {/* Productos por categorías con subcategorías */}
        <div className="space-y-4">
          {Object.entries(menuCategories).map(([categoryKey, category]) => {
            // Obtener todos los items de la categoría (incluyendo subcategorías)
            let allCategoryItems = [];
            
            if (category.subcategories) {
              // Si tiene subcategorías, obtener items de todas
              Object.values(category.subcategories).forEach(subcategory => {
                if (subcategory.items) {
                  allCategoryItems.push(...subcategory.items);
                }
              });
            } else if (category.items) {
              // Si no tiene subcategorías, usar items directamente
              allCategoryItems = category.items;
            }
            
            // Filtrar items según búsqueda
            const filteredItems = allCategoryItems.filter(item => 
              sharedSearchTerm === '' ||
              item.name.toLowerCase().includes(sharedSearchTerm.toLowerCase()) ||
              item.description.toLowerCase().includes(sharedSearchTerm.toLowerCase())
            );

            if (filteredItems.length === 0) return null;

            // Si hay búsqueda activa, expandir automáticamente las categorías con resultados
            const isCategoryExpanded = sharedSearchTerm.trim() ? true : (sharedExpanded[categoryKey] ?? false);
            
            return (
              <div key={categoryKey} className="mb-4">
                {/* Header colapsible */}
                <div 
                  className="card cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => setSharedExpanded({...sharedExpanded, [categoryKey]: !isCategoryExpanded})}
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <h3 className="font-display text-xl font-semibold text-restaurant-earth">
                        {category.name}
                      </h3>
                      {!isCategoryExpanded && (
                        <span className="text-sm text-restaurant-text-light bg-restaurant-light-wood px-3 py-1 rounded-full">
                          {filteredItems.length} productos
                        </span>
                      )}
                    </div>
                    {isCategoryExpanded ? (
                      <ChevronUp className="w-6 h-6 text-restaurant-earth" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-restaurant-earth" />
                    )}
                  </div>
                </div>

                {/* Contenido expandible */}
                {isCategoryExpanded && (
                  <div className="mt-2 card overflow-hidden">
                    <div className="bg-gradient-to-r from-restaurant-light-wood to-restaurant-cream p-4 border-b">
                      <p className="text-restaurant-text-light text-sm">{category.description}</p>
                    </div>
                
                    <div className="divide-y divide-gray-100">
                      {filteredItems.map((item) => {
                    const isSelected = sharedItems[item.id] || false;
                    const participants = sharedParticipants[item.id] || [];
                    
                    return (
                      <div key={item.id} className="p-4">
                      {/* Layout responsive mejorado */}
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex items-start space-x-4 flex-1">
                          {/* Checkbox para compartir */}
                          <input
                            type="checkbox"
                            id={`shared-${item.id}`}
                            checked={isSelected}
                            onChange={(e) => handleSharedItemSelection(item.id, e.target.checked)}
                            className="w-5 h-5 text-restaurant-earth bg-gray-100 border-gray-300 rounded focus:ring-restaurant-earth focus:ring-2 mt-1"
                          />
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-restaurant-text text-lg leading-tight">{item.name}</h4>
                            <p className="text-sm text-restaurant-text-light mt-1 leading-relaxed">{item.description}</p>
                            
                            {isSelected && (
                              <span className="text-xs bg-restaurant-earth text-white px-2 py-1 rounded-full mt-2 inline-block">
                                Compartir
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-center lg:text-right min-w-[100px]">
                          <div className="text-lg font-bold text-restaurant-earth">
                            {item.price === 0 ? 'Incluida' : `€${item.price.toFixed(2)}`}
                          </div>
                          {isSelected && item.price > 0 && participants.length > 0 && (
                            <div className="text-sm text-restaurant-text-light mt-1">
                              Por persona: €{(item.price / participants.length).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Selector de participantes para items compartidos */}
                      {isSelected && (
                        <div className="mt-4 p-4 bg-restaurant-light-wood/30 rounded-lg">
                          <h5 className="font-semibold text-restaurant-text mb-3">
                            ¿Quién va a compartir {item.name}?
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {diners.map((diner, index) => (
                              <label key={diner.id} className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg">
                                <input
                                  type="checkbox"
                                  checked={participants.includes(diner.id)}
                                  onChange={(e) => handleSharedParticipantSelection(item.id, diner.id, e.target.checked)}
                                  className="w-5 h-5 text-restaurant-earth bg-white border-restaurant-light-wood rounded focus:ring-restaurant-earth focus:ring-2"
                                />
                                <span className="text-sm font-medium text-restaurant-text">
                                  {diner.name}
                                </span>
                              </label>
                            ))}
                          </div>
                          {participants.length > 0 && (
                            <div className="mt-3 p-2 bg-restaurant-light-wood/50 rounded-lg border border-restaurant-wood">
                              <p className="text-sm font-medium text-black text-center">
                                {participants.length} persona{participants.length !== 1 ? 's' : ''} participando
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                      </div>
                    );
                  })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navegación */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep('shared-question')}
            className="btn-secondary"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              setCurrentDinerIndex(0);
              setStep('individual-orders');
            }}
            className="btn-primary"
          >
            Continuar con pedidos individuales
          </button>
        </div>

        {/* Resumen de items compartidos seleccionados */}
        {selectedSharedItems.length > 0 && (
          <div className="mt-8 card p-6 bg-restaurant-cream border-2 border-restaurant-light-wood">
            <h4 className="font-semibold text-restaurant-earth mb-3">
              📋 Items compartidos seleccionados ({selectedSharedItems.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedSharedItems.map(itemId => {
                // Buscar el item en todas las categorías y subcategorías
                let item = null;
                for (const category of Object.values(menuCategories)) {
                  if (category.subcategories) {
                    for (const subcategory of Object.values(category.subcategories)) {
                      const foundItem = subcategory.items?.find(i => i.id === itemId);
                      if (foundItem) {
                        item = foundItem;
                        break;
                      }
                    }
                  } else if (category.items) {
                    const foundItem = category.items.find(i => i.id === itemId);
                    if (foundItem) {
                      item = foundItem;
                      break;
                    }
                  }
                  if (item) break;
                }
                const participants = sharedParticipants[itemId] || [];
                
                return (
                  <div key={itemId} className="text-sm bg-white p-2 rounded border">
                    <div className="font-medium text-restaurant-text">{item?.name}</div>
                    <div className="text-restaurant-text-light">
                      {participants.length} participante{participants.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Componente para selector de cantidad con botones +/-
  const QuantitySelector = ({ itemId, quantity, onQuantityChange }) => {
    const handleIncrement = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const newQuantity = Math.min(10, quantity + 1);
      onQuantityChange(newQuantity);
    };

    const handleDecrement = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const newQuantity = Math.max(0, quantity - 1);
      onQuantityChange(newQuantity);
    };

    return (
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={handleDecrement}
          onMouseDown={handleDecrement}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold select-none cursor-pointer touch-manipulation bg-restaurant-light-wood text-restaurant-earth hover:bg-restaurant-wood hover:text-white focus:bg-restaurant-wood focus:text-white focus:outline-none focus:ring-2 focus:ring-restaurant-earth`}
          aria-label="Disminuir cantidad"
          style={{ 
            WebkitTapHighlightColor: 'transparent',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none'
          }}
        >
          −
        </button>
        
        <div className="w-12 h-8 bg-white border border-restaurant-light-wood rounded-lg flex items-center justify-center">
          <span className="text-sm font-semibold text-restaurant-text">{quantity}</span>
        </div>
        
        <button
          type="button"
          onClick={handleIncrement}
          onMouseDown={handleIncrement}
          disabled={quantity === 10}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold select-none cursor-pointer touch-manipulation ${
            quantity === 10
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-restaurant-light-wood text-restaurant-earth hover:bg-restaurant-wood hover:text-white focus:bg-restaurant-wood focus:text-white focus:outline-none focus:ring-2 focus:ring-restaurant-gold'
          }`}
          aria-label="Aumentar cantidad"
          style={{ 
            WebkitTapHighlightColor: 'transparent',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none'
          }}
        >
          +
        </button>
      </div>
    );
  };

  // Renderizar pedidos individuales del comensal actual
  const renderIndividualOrders = () => {
    // Validar que hay comensales
    if (!diners || diners.length === 0) {
      return (
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="card p-8 text-center">
            <p className="text-restaurant-text-light mb-4">Error: No hay comensales configurados</p>
            <button onClick={resetAll} className="btn-primary">Volver al inicio</button>
          </div>
        </div>
      );
    }

    // Validar que el índice del comensal es válido
    if (currentDinerIndex < 0 || currentDinerIndex >= diners.length) {
      setCurrentDinerIndex(0);
      return null;
    }

    const currentDiner = diners[currentDinerIndex];
    
    if (!currentDiner) {
      return (
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="card p-8 text-center">
            <p className="text-restaurant-text-light mb-4">Error: Comensal no encontrado</p>
            <button onClick={resetAll} className="btn-primary">Volver al inicio</button>
          </div>
        </div>
      );
    }

    const dinerTotal = totals[currentDiner.id] || 0;

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header del comensal */}
        <div className="card p-6 mb-8 bg-gradient-to-r from-restaurant-earth to-restaurant-wood text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                {currentDiner.name}
              </h1>
              <p className="text-restaurant-cream">
                Selecciona lo que consumió esta persona individualmente
              </p>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-3xl font-bold">€{dinerTotal.toFixed(2)}</div>
              <p className="text-sm text-restaurant-cream">Total actual</p>
            </div>
          </div>
          
          {/* Progreso */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progreso: {currentDinerIndex + 1} de {diners.length}</span>
              <span>{Math.round(((currentDinerIndex + 1) / diners.length) * 100)}%</span>
            </div>
            <div className="w-full bg-restaurant-light-wood rounded-full h-2">
              <div 
                className="bg-restaurant-earth h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentDinerIndex + 1) / diners.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Información sobre pedidos individuales */}
        <div className="card p-4 mb-6 bg-gradient-to-r from-restaurant-light-wood to-restaurant-cream">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-semibold text-restaurant-text">Pedidos individuales</h4>
              <p className="text-sm text-restaurant-text-light">
                Selecciona lo que consumió {currentDiner.name} individualmente. 
                Los elementos compartidos ya se calcularon automáticamente.
              </p>
              <p className="text-sm text-restaurant-text-light mt-1">
                <strong>💡 Las tapas van gratis con las bebidas:</strong> Si consumes 1 bebida + 2 tapas, pagas solo 1 tapa extra (3€).
              </p>
            </div>
          </div>
        </div>

        {/* Información de tapas gratis para el comensal actual */}
        {(() => {
          const tapasInfo = calculateExtraTapas(currentDiner.id);
          if (tapasInfo.bebidas > 0 || tapasInfo.tapasGratis > 0) {
            return (
              <div className="card p-4 mb-6 bg-restaurant-cream border-2 border-restaurant-light-wood">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🍽️</span>
                  <div>
                    <h4 className="font-semibold text-restaurant-text">Cálculo de tapas</h4>
                    <div className="text-sm text-restaurant-text-light space-y-1">
                      <p>• Bebidas: {tapasInfo.bebidas}</p>
                      <p>• Tapas gratis incluidas: {tapasInfo.tapasGratis}</p>
                      {tapasInfo.tapasExtras > 0 && (
                        <p className="text-restaurant-earth font-bold">• Tapas extras a pagar: {tapasInfo.tapasExtras} (€{tapasInfo.precioTapasExtras.toFixed(2)})</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })()}

        {/* Buscador */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-restaurant-text-light" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-restaurant-light-wood rounded-xl focus:ring-2 focus:ring-restaurant-earth focus:border-restaurant-earth outline-none"
          />
        </div>

        {/* Productos por categorías con subcategorías */}
        <div className="space-y-4">
          {Object.entries(menuCategories).map(([categoryKey, category]) => {
            // Obtener todos los items de la categoría (incluyendo subcategorías)
            let allCategoryItems = [];
            
            if (category.subcategories) {
              // Si tiene subcategorías, obtener items de todas
              Object.values(category.subcategories).forEach(subcategory => {
                if (subcategory.items) {
                  allCategoryItems.push(...subcategory.items);
                }
              });
            } else if (category.items) {
              // Si no tiene subcategorías, usar items directamente
              allCategoryItems = category.items;
            }
            
            // Filtrar items según búsqueda
            const filteredItems = allCategoryItems.filter(item => 
              searchTerm === '' ||
              item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.description.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredItems.length === 0) return null;

            // Si hay búsqueda activa, expandir automáticamente las categorías con resultados
            const isCategoryExpanded = searchTerm.trim() ? true : (isExpanded[categoryKey] ?? false);

            return (
              <div key={categoryKey} className="mb-4">
                {/* Header colapsible */}
                <div 
                  className="card cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => setIsExpanded({...isExpanded, [categoryKey]: !isCategoryExpanded})}
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <h3 className="font-display text-xl font-semibold text-restaurant-earth">
                        {category.name}
                      </h3>
                      {!isCategoryExpanded && (
                        <span className="text-sm text-restaurant-text-light bg-restaurant-light-wood px-3 py-1 rounded-full">
                          {filteredItems.length} productos
                        </span>
                      )}
                    </div>
                    {isCategoryExpanded ? (
                      <ChevronUp className="w-6 h-6 text-restaurant-earth" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-restaurant-earth" />
                    )}
                  </div>
                </div>

                {/* Contenido expandible */}
                {isCategoryExpanded && (
                  <div className="mt-2 card overflow-hidden">
                    <div className="bg-gradient-to-r from-restaurant-light-wood to-restaurant-cream p-4 border-b">
                      <p className="text-restaurant-text-light text-sm">{category.description}</p>
                    </div>
              
                    <div className="divide-y divide-gray-100">
                      {filteredItems.map((item) => {
                        const key = `${currentDiner.id}-${item.id}`;
                        const quantity = individualOrders[key] || 0;
                        
                        return (
                          <div key={item.id} className="p-4">
                            {/* Layout responsive mejorado */}
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                              {/* Información del producto */}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-restaurant-text text-lg leading-tight">{item.name}</h4>
                                <p className="text-sm text-restaurant-text-light mt-1 leading-relaxed">{item.description}</p>
                              </div>
                              
                              {/* Selector de cantidad y precio */}
                              <div className="flex flex-col items-center gap-6">
                                {/* Selector de cantidad */}
                                <div className="flex flex-col items-center">
                                  <label className="text-sm font-medium text-restaurant-text-light mb-3">
                                    Cantidad
                                  </label>
                                  <QuantitySelector
                                    itemId={item.id}
                                    quantity={quantity}
                                    onQuantityChange={(newQuantity) => handleIndividualOrder(currentDiner.id, item.id, newQuantity)}
                                  />
                                </div>
                                
                                {/* Precio */}
                                <div className="text-center">
                                  <div className="text-lg font-bold text-restaurant-gold">
                                    {item.price === 0 ? 'Incluida' : `€${item.price.toFixed(2)}`}
                                  </div>
                                  {quantity > 0 && item.price > 0 && (
                                    <div className="text-sm text-restaurant-text-light mt-1">
                                      Total: €{(item.price * quantity).toFixed(2)}
                                    </div>
                                  )}
                                  {quantity > 0 && item.price === 0 && (
                                    <div className="text-sm text-restaurant-text-light mt-1">
                                      Incluida
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navegación */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <button
            onClick={() => {
              if (hasSharedItems === true) {
                setStep('shared-selection');
              } else {
                setStep('shared-question');
              }
            }}
            className="btn-secondary w-full sm:w-auto"
          >
            Cancelar
          </button>
          <button
            onClick={nextDiner}
            className="btn-primary w-full sm:w-auto"
          >
            {currentDinerIndex < diners.length - 1 ? 'Siguiente comensal' : 'Ver resumen'}
          </button>
        </div>
      </div>
    );
  };

  // Renderizar resumen final
  const renderSummary = () => {
    const allItemsTotal = Object.values(totals).reduce((sum, total) => sum + total, 0);
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-restaurant-earth rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl border-4 border-restaurant-light-wood">
            <span className="text-3xl">📊</span>
          </div>
          <h1 className="section-title">Resumen de la cuenta</h1>
          <p className="text-restaurant-text-light">
            Revisa los totales y edita cualquier pedido si es necesario
          </p>
        </div>

        {/* Resumen general */}
        <div className="card p-6 mb-8 bg-gradient-to-r from-restaurant-earth to-restaurant-wood text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Total general</h3>
              <p className="text-restaurant-cream">
                Suma de todos los pedidos individuales + compartidos
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">€{allItemsTotal.toFixed(2)}</div>
              <p className="text-sm text-restaurant-cream">Total a pagar</p>
            </div>
          </div>
        </div>

        {/* Detalle por comensal */}
        <div className="space-y-6 mb-8">
          {diners.map((diner, index) => {
            const products = getDinerProducts(diner.id);
            
            return (
              <div key={index} className="card p-6">
                {/* Header del comensal */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-restaurant-earth to-restaurant-wood rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-restaurant-text">
                        {diner.name}
                      </h4>
                      <p className="text-sm text-restaurant-text-light">
                        {products.length} producto{products.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-restaurant-earth">
                      €{totals[diner.id]?.toFixed(2) || '0.00'}
                    </div>
                  </div>
                </div>
                
                {/* Lista detallada de productos */}
                {products.length > 0 ? (
                  <div className="bg-restaurant-cream/50 rounded-lg p-4">
                    <h5 className="font-semibold text-restaurant-text mb-3 text-sm">
                      Productos consumidos:
                    </h5>
                    <div className="space-y-2">
                      {products.map((product, productIndex) => (
                        <div key={productIndex} className="flex justify-between items-center text-sm">
                          <div className="flex items-center space-x-2">
                            <span className={`w-2 h-2 rounded-full ${
                              product.type === 'individual' ? 'bg-restaurant-earth' : 
                              product.type === 'shared' ? 'bg-restaurant-wood' :
                              product.type === 'extra-tapas' ? 'bg-orange-500' : 'bg-restaurant-earth'
                            }`}></span>
                            <span className="text-restaurant-text">
                              {product.name}
                            </span>
                            {product.quantity > 1 && product.type !== 'extra-tapas' && (
                              <span className="text-restaurant-text-light">
                                (x{product.quantity})
                              </span>
                            )}
                            {product.type === 'shared' && (
                              <span className="text-restaurant-text-light">
                                entre {product.totalParticipants}
                              </span>
                            )}
                            {product.type === 'extra-tapas' && (
                              <span className="text-orange-600 font-medium text-xs">
                                (calculado automáticamente)
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <span className="font-semibold text-restaurant-earth">
                              €{product.totalPrice.toFixed(2)}
                            </span>
                            {product.type === 'shared' && (
                              <div className="text-xs text-restaurant-text-light">
                                (€{product.unitPrice.toFixed(2)} c/u)
                              </div>
                            )}
                            {product.type === 'extra-tapas' && (
                              <div className="text-xs text-restaurant-text-light">
                                (€{product.unitPrice.toFixed(2)} c/u)
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-restaurant-light-wood/30 rounded-lg p-4 text-center">
                    <p className="text-sm text-restaurant-text-light">
                      No ha consumido nada individualmente
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Botones de acción */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Volver al inicio
          </button>
          <button
            onClick={resetAll}
            className="btn-primary"
          >
            Nueva división
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-8 card p-6 bg-gradient-to-r from-restaurant-cream to-restaurant-light-wood">
          <h4 className="font-semibold text-restaurant-earth mb-3">💡 Consejos</h4>
          <ul className="text-sm text-restaurant-text space-y-1">
            <li>• Los elementos compartidos se dividen automáticamente entre los participantes</li>
            <li>• Las tapas están incluidas con la bebida (no se cobran por separado)</li>
            <li>• Solo se cobran las tapas extra marcadas como tal (3€)</li>
            <li>• Verifica que la suma total coincida con la cuenta del restaurante</li>
          </ul>
        </div>
      </div>
    );
  };

  // Renderizar según el paso actual
  switch (step) {
    case 'setup':
      return renderSetup();
    case 'names':
      return renderNames();
    case 'shared-question':
      return renderSharedQuestion();
    case 'shared-selection':
      return renderSharedSelection();
    case 'individual-orders':
      return renderIndividualOrders();
    case 'summary':
      return renderSummary();
    default:
      return renderSetup();
  }
};

export default SplitBill;