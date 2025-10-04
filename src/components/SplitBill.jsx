import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { menuCategories } from '../data';

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
      
      return {
        ...prev,
        [itemId]: newParticipants
      };
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
        
        const category = Object.values(menuCategories).find(cat => 
          cat.items.some(item => item.id === itemId)
        );
        const item = category?.items.find(item => item.id === itemId);
        
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
        const category = Object.values(menuCategories).find(cat => 
          cat.items.some(item => item.id === itemId)
        );
        const item = category?.items.find(item => item.id === itemId);
        
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
        
        const category = Object.values(menuCategories).find(cat => 
          cat.items.some(item => item.id === itemId)
        );
        const item = category?.items.find(item => item.id === itemId);
        
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
    if (diners.length === 0) return;
    
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
        const category = Object.values(menuCategories).find(cat => 
          cat.items.some(item => item.id === itemId)
        );
        const item = category?.items.find(item => item.id === itemId);
        
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
        
        const category = Object.values(menuCategories).find(cat => 
          cat.items.some(item => item.id === itemId)
        );
        const item = category?.items.find(item => item.id === itemId);
        
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
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-restaurant-gold to-restaurant-bronze rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🍽️</span>
        </div>
        <h1 className="section-title">Dividir la cuenta</h1>
        <p className="text-restaurant-text-light text-lg">
          Nuevo sistema inteligente para dividir gastos
        </p>
      </div>

      <div className="card p-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-restaurant-earth mb-4">
            ¿Cuántos comensales son?
          </h3>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <button
              onClick={() => setNumberOfDiners(Math.max(1, numberOfDiners - 1))}
              className="w-12 h-12 bg-restaurant-light-wood text-restaurant-earth rounded-full hover:bg-restaurant-wood hover:text-white transition-colors"
            >
              -
            </button>
            <span className="text-3xl font-bold text-restaurant-earth w-16">
              {numberOfDiners}
            </span>
            <button
              onClick={() => setNumberOfDiners(Math.min(10, numberOfDiners + 1))}
              className="w-12 h-12 bg-restaurant-light-wood text-restaurant-earth rounded-full hover:bg-restaurant-wood hover:text-white transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Cancelar
          </button>
          <button
            onClick={initializeDiners}
            className="btn-primary"
          >
            Continuar
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <div className="text-2xl mb-2">👥</div>
          <h4 className="font-semibold text-restaurant-earth">1. Comensales</h4>
          <p className="text-sm text-restaurant-text-light">Define cuántos son</p>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl mb-2">✏️</div>
          <h4 className="font-semibold text-restaurant-earth">2. Nombres</h4>
          <p className="text-sm text-restaurant-text-light">Asigna nombres</p>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl mb-2">🤝</div>
          <h4 className="font-semibold text-restaurant-earth">3. Compartir</h4>
          <p className="text-sm text-restaurant-text-light">¿Algo compartido?</p>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl mb-2">📝</div>
          <h4 className="font-semibold text-restaurant-earth">4. Individual</h4>
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
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-restaurant-gold to-restaurant-bronze rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🤝</span>
        </div>
        <h1 className="section-title">¿Han consumido algo a compartir?</h1>
        <p className="text-restaurant-text-light text-lg">
          Antes de registrar el consumo individual, necesitamos saber si hay elementos compartidos
        </p>
      </div>

      <div className="card p-8">
        <div className="text-center space-y-6">         
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setHasSharedItems(true);
                setStep('shared-selection');
              }}
              className="btn-primary text-lg px-8 py-4"
            >
              <span className="text-2xl mr-2">✅</span>
              Sí, hay algo compartido
            </button>
            
            <button
              onClick={() => {
                setHasSharedItems(false);
                setStep('individual-orders');
              }}
              className="btn-secondary text-lg px-8 py-4"
            >
              <span className="text-2xl mr-2">❌</span>
              No, todo individual
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setStep('names')}
            className="btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </div>

      <div className="mt-8 card p-6 bg-gradient-to-r from-restaurant-cream to-restaurant-light-wood">
        <h4 className="font-semibold text-restaurant-earth mb-3">💡 ¿Qué se considera compartido?</h4>
        <ul className="text-sm text-restaurant-text space-y-1">
          <li>• <strong>Raciones:</strong> Paellas, pulpo, carrillada, ensaladas grandes</li>
          <li>• <strong>Bebidas:</strong> Jarras de sangría, botellas de vino</li>
          <li>• <strong>Postres:</strong> Tarta para compartir</li>
          <li>• <strong>Otros:</strong> Cualquier plato que se divida entre varias personas</li>
        </ul>
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

        {/* Productos por categorías */}
        <div className="space-y-6">
          {Object.entries(menuCategories).map(([categoryKey, category]) => (
            <div key={categoryKey} className="card overflow-hidden">
              <div className="bg-gradient-to-r from-restaurant-light-wood to-restaurant-cream p-4 border-b">
                <h3 className="font-display text-xl font-semibold text-restaurant-earth">
                  {category.name}
                </h3>
                <p className="text-restaurant-text-light text-sm">{category.description}</p>
              </div>
              
              <div className="divide-y divide-gray-100">
                {category.items.map((item) => {
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
                            className="w-5 h-5 text-restaurant-gold bg-gray-100 border-gray-300 rounded focus:ring-restaurant-gold focus:ring-2 mt-1"
                          />
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-restaurant-text text-lg leading-tight">{item.name}</h4>
                            <p className="text-sm text-restaurant-text-light mt-1 leading-relaxed">{item.description}</p>
                            
                            {isSelected && (
                              <span className="text-xs bg-restaurant-gold text-white px-2 py-1 rounded-full mt-2 inline-block">
                                Compartir
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-center lg:text-right min-w-[100px]">
                          <div className="text-lg font-bold text-restaurant-gold">
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
                                  className="w-5 h-5 text-restaurant-gold bg-white border-restaurant-light-wood rounded focus:ring-restaurant-gold focus:ring-2"
                                />
                                <span className="text-sm font-medium text-restaurant-text">
                                  {diner.name}
                                </span>
                              </label>
                            ))}
                          </div>
                          {participants.length > 0 && (
                            <div className="mt-3 p-2 bg-restaurant-gold/10 rounded-lg">
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
          ))}
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
            onClick={() => setStep('individual-orders')}
            className="btn-primary"
          >
            Continuar con pedidos individuales
          </button>
        </div>

        {/* Resumen de items compartidos seleccionados */}
        {selectedSharedItems.length > 0 && (
          <div className="mt-8 card p-6 bg-gradient-to-r from-restaurant-gold/10 to-restaurant-bronze/10">
            <h4 className="font-semibold text-restaurant-earth mb-3">
              📋 Items compartidos seleccionados ({selectedSharedItems.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedSharedItems.map(itemId => {
                const category = Object.values(menuCategories).find(cat => 
                  cat.items.some(item => item.id === itemId)
                );
                const item = category?.items.find(item => item.id === itemId);
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
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold select-none cursor-pointer touch-manipulation bg-restaurant-light-wood text-restaurant-earth hover:bg-restaurant-wood hover:text-white focus:bg-restaurant-wood focus:text-white focus:outline-none focus:ring-2 focus:ring-restaurant-gold`}
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
    const currentDiner = diners[currentDinerIndex];
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
                className="bg-restaurant-gold h-2 rounded-full transition-all duration-300"
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
              <div className="card p-4 mb-6 bg-gradient-to-r from-restaurant-gold/10 to-restaurant-bronze/10 border border-restaurant-gold/20">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🍽️</span>
                  <div>
                    <h4 className="font-semibold text-restaurant-text">Cálculo de tapas</h4>
                    <div className="text-sm text-restaurant-text-light space-y-1">
                      <p>• Bebidas: {tapasInfo.bebidas}</p>
                      <p>• Tapas gratis incluidas: {tapasInfo.tapasGratis}</p>
                      {tapasInfo.tapasExtras > 0 && (
                        <p className="text-restaurant-gold font-medium">• Tapas extras a pagar: {tapasInfo.tapasExtras} (€{tapasInfo.precioTapasExtras.toFixed(2)})</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })()}

        {/* Productos por categorías */}
        <div className="space-y-6">
          {Object.entries(menuCategories).map(([categoryKey, category]) => (
            <div key={categoryKey} className="card overflow-hidden">
              <div className="bg-gradient-to-r from-restaurant-light-wood to-restaurant-cream p-4 border-b">
                <h3 className="font-display text-xl font-semibold text-restaurant-earth">
                  {category.name}
                </h3>
                <p className="text-restaurant-text-light text-sm">{category.description}</p>
              </div>
              
              <div className="divide-y divide-gray-100">
                {category.items.map((item) => {
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
          ))}
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
          <div className="w-20 h-20 bg-gradient-to-br from-restaurant-gold to-restaurant-bronze rounded-full flex items-center justify-center mx-auto mb-4">
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
                    <div className="text-2xl font-bold text-restaurant-gold">
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
                              product.type === 'shared' ? 'bg-restaurant-gold' :
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
                            <span className="font-semibold text-restaurant-gold">
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