import { useState, useEffect } from 'react';
import { menuCategories } from '../data';

/**
 * Componente avanzado para dividir la cuenta entre comensales
 * Permite configurar comensales, asignar pedidos por persona y calcular totales
 */
const SplitBill = () => {
  // Estados principales
  const [step, setStep] = useState('setup'); // 'setup', 'diners', 'orders', 'summary'
  const [numberOfDiners, setNumberOfDiners] = useState(4);
  const [diners, setDiners] = useState([]);
  const [currentDinerIndex, setCurrentDinerIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});
  const [quantities, setQuantities] = useState({});
  const [sharedItems, setSharedItems] = useState({}); // Items compartidos
  const [sharedParticipants, setSharedParticipants] = useState({}); // Quién participa en cada item compartido
  const [totals, setTotals] = useState({});
  const [grandTotal, setGrandTotal] = useState(0);

  // Inicializar comensales
  const initializeDiners = () => {
    const newDiners = [];
    for (let i = 0; i < numberOfDiners; i++) {
      newDiners.push({
        id: i,
        name: '',
        orders: {},
        total: 0
      });
    }
    setDiners(newDiners);
    setCurrentDinerIndex(0);
    setStep('diners');
  };

  // Manejar selección de items para el comensal actual
  const handleItemSelection = (itemId, isSelected) => {
    const dinerId = diners[currentDinerIndex].id;
    const key = `${dinerId}-${itemId}`;
    
    setSelectedItems(prev => ({
      ...prev,
      [key]: isSelected
    }));
    
    // Si se deselecciona, resetear cantidad
    if (!isSelected) {
      setQuantities(prev => ({
        ...prev,
        [key]: 1
      }));
    }
  };

  // Manejar cambio de cantidad
  const handleQuantityChange = (itemId, quantity) => {
    const dinerId = diners[currentDinerIndex].id;
    const key = `${dinerId}-${itemId}`;
    const numQuantity = Math.max(1, parseInt(quantity) || 1);
    
    setQuantities(prev => ({
      ...prev,
      [key]: numQuantity
    }));
  };

  // Manejar selección de item compartido
  const handleSharedItemSelection = (itemId, isShared) => {
    const key = `${currentDinerIndex}-${itemId}`;
    
    setSharedItems(prev => ({
      ...prev,
      [key]: isShared
    }));
    
    // Si se deselecciona como compartido, resetear participantes
    if (!isShared) {
      setSharedParticipants(prev => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });
    }
  };

  // Manejar selección de participantes para item compartido
  const handleSharedParticipantSelection = (itemId, dinerId, isParticipating) => {
    const key = `${currentDinerIndex}-${itemId}`;
    
    setSharedParticipants(prev => {
      const currentParticipants = prev[key] || [];
      let newParticipants;
      
      if (isParticipating) {
        newParticipants = [...currentParticipants, dinerId];
      } else {
        newParticipants = currentParticipants.filter(id => id !== dinerId);
      }
      
      return {
        ...prev,
        [key]: newParticipants
      };
    });
  };

  // Calcular total para el comensal actual
  const calculateDinerTotal = (dinerId) => {
    let total = 0;
    
    // Items individuales
    Object.entries(selectedItems).forEach(([key, isSelected]) => {
      if (key.startsWith(`${dinerId}-`) && isSelected) {
        const itemId = key.split('-').slice(1).join('-');
        const quantity = quantities[key] || 1;
        
        const category = Object.values(menuCategories).find(cat => 
          cat.items.some(item => item.id === itemId)
        );
        const item = category?.items.find(item => item.id === itemId);
        
        if (item) {
          total += item.price * quantity;
        }
      }
    });
    
    // Items compartidos
    Object.entries(sharedItems).forEach(([key, isShared]) => {
      if (isShared) {
        const [dinerIndex, itemId] = key.split('-', 2);
        const participants = sharedParticipants[key] || [];
        
        // Si este comensal participa en el item compartido
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
      }
    });
    
    return total;
  };

  // Actualizar totales cuando cambian los items
  useEffect(() => {
    const newTotals = {};
    let grandTotalCalc = 0;
    
    diners.forEach(diner => {
      const total = calculateDinerTotal(diner.id);
      newTotals[diner.id] = total;
      grandTotalCalc += total;
    });
    
    setTotals(newTotals);
    setGrandTotal(grandTotalCalc);
    
    // Actualizar el total del comensal actual
    setDiners(prev => prev.map(diner => ({
      ...diner,
      total: newTotals[diner.id] || 0
    })));
  }, [selectedItems, quantities, sharedItems, sharedParticipants, diners]);

  // Siguiente comensal
  const nextDiner = () => {
    if (currentDinerIndex < diners.length - 1) {
      setCurrentDinerIndex(currentDinerIndex + 1);
      // Scroll al inicio de la página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setStep('summary');
      // Scroll al inicio de la página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Comensal anterior
  const previousDiner = () => {
    if (currentDinerIndex > 0) {
      setCurrentDinerIndex(currentDinerIndex - 1);
      // Scroll al inicio de la página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Editar comensal específico
  const editDiner = (index) => {
    setCurrentDinerIndex(index);
    setStep('orders');
    // Scroll al inicio de la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Actualizar nombre del comensal
  const updateDinerName = (index, name) => {
    setDiners(prev => prev.map((diner, i) => 
      i === index ? { ...diner, name } : diner
    ));
  };

  // Obtener productos detallados de un comensal
  const getDinerProducts = (dinerId) => {
    const products = [];
    
    // Items individuales
    Object.entries(selectedItems).forEach(([key, isSelected]) => {
      if (key.startsWith(`${dinerId}-`) && isSelected) {
        const itemId = key.split('-').slice(1).join('-');
        const quantity = quantities[key] || 1;
        
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
    
    // Items compartidos
    Object.entries(sharedParticipants).forEach(([key, participants]) => {
      if (participants.includes(dinerId)) {
        const [dinerIndex, itemId] = key.split('-', 2);
        
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
    
    return products;
  };

  // Resetear todo
  const resetAll = () => {
    setStep('setup');
    setNumberOfDiners(4);
    setDiners([]);
    setCurrentDinerIndex(0);
    setSelectedItems({});
    setQuantities({});
    setSharedItems({});
    setSharedParticipants({});
    setTotals({});
    setGrandTotal(0);
  };

  // Renderizar setup inicial
  const renderSetup = () => (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-restaurant-gold to-restaurant-bronze rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🍽️</span>
        </div>
        <h1 className="section-title">Dividir la Cuenta</h1>
        <p className="text-restaurant-text-light text-lg">
          Organiza los gastos de cada comensal de forma inteligente
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
            onClick={resetAll}
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

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4 text-center">
          <div className="text-2xl mb-2">👥</div>
          <h4 className="font-semibold text-restaurant-earth">Configurar</h4>
          <p className="text-sm text-restaurant-text-light">Define cuántos comensales</p>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl mb-2">✏️</div>
          <h4 className="font-semibold text-restaurant-earth">Nombres</h4>
          <p className="text-sm text-restaurant-text-light">Asigna nombres a cada persona</p>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl mb-2">📝</div>
          <h4 className="font-semibold text-restaurant-earth">Pedidos</h4>
          <p className="text-sm text-restaurant-text-light">Registra lo que consumió cada uno</p>
        </div>
      </div>
    </div>
  );

  // Renderizar configuración de nombres
  const renderDinerNames = () => (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="section-title">Nombres de los Comensales</h1>
        <p className="text-restaurant-text-light">
          Asigna un nombre a cada persona para organizar mejor los pedidos
        </p>
      </div>

      <div className="card p-6">
        <div className="space-y-4">
          {diners.map((diner, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-restaurant-earth to-restaurant-wood rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <input
                type="text"
                placeholder={`Nombre del comensal ${index + 1}`}
                value={diner.name}
                onChange={(e) => updateDinerName(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-restaurant-light-wood rounded-lg focus:ring-2 focus:ring-restaurant-earth focus:border-restaurant-earth"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep('setup')}
            className="btn-secondary"
          >
            Atrás
          </button>
          <button
            onClick={() => setStep('orders')}
            className="btn-primary"
            disabled={diners.some(diner => !diner.name.trim())}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );

  // Renderizar pedidos del comensal actual
  const renderDinerOrders = () => {
    const currentDiner = diners[currentDinerIndex];
    const dinerTotal = totals[currentDiner.id] || 0;

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header del comensal */}
        <div className="card p-6 mb-8 bg-gradient-to-r from-restaurant-earth to-restaurant-wood text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                {currentDiner.name || `Comensal ${currentDinerIndex + 1}`}
              </h1>
              <p className="text-restaurant-cream">
                Selecciona lo que consumió esta persona
              </p>
            </div>
            <div className="text-right">
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

        {/* Información sobre el sistema de compartir */}
        <div className="card p-4 mb-6 bg-gradient-to-r from-restaurant-light-wood to-restaurant-cream">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-semibold text-restaurant-text">Cómo funciona el sistema de compartir</h4>
              <p className="text-sm text-restaurant-text-light">
                • <strong>Individual:</strong> Solo tú pagas por este producto<br/>
                • <strong>Compartir:</strong> Selecciona quién más va a participar y el precio se divide entre todos
              </p>
            </div>
          </div>
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
                  const key = `${currentDiner.id}-${item.id}`;
                  const sharedKey = `${currentDinerIndex}-${item.id}`;
                  const isSelected = selectedItems[key] || false;
                  const isShared = sharedItems[sharedKey] || false;
                  const quantity = quantities[key] || 1;
                  const participants = sharedParticipants[sharedKey] || [];
                  
                  return (
                    <div key={item.id} className="p-4 hover:bg-restaurant-cream transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          {/* Checkbox individual */}
                          <input
                            type="checkbox"
                            id={`split-${item.id}`}
                            checked={isSelected}
                            onChange={(e) => handleItemSelection(item.id, e.target.checked)}
                            className="w-5 h-5 text-restaurant-earth bg-gray-100 border-gray-300 rounded focus:ring-restaurant-earth focus:ring-2"
                          />
                          
                          {/* Checkbox compartir (solo para raciones y bebidas) */}
                          {item.category === 'raciones' && (
                            <input
                              type="checkbox"
                              id={`share-${item.id}`}
                              checked={isShared}
                              onChange={(e) => handleSharedItemSelection(item.id, e.target.checked)}
                              className="w-5 h-5 text-restaurant-gold bg-gray-100 border-gray-300 rounded focus:ring-restaurant-gold focus:ring-2"
                            />
                          )}
                          
                          <div className="flex-1">
                            <h4 className="font-semibold text-restaurant-text">{item.name}</h4>
                            <p className="text-sm text-restaurant-text-light">{item.description}</p>
                            
                            {/* Etiquetas de estado */}
                            <div className="flex items-center space-x-2 mt-1">
                              {isSelected && (
                                <span className="text-xs bg-restaurant-earth text-white px-2 py-1 rounded-full">
                                  Individual
                                </span>
                              )}
                              {isShared && (
                                <span className="text-xs bg-restaurant-gold text-white px-2 py-1 rounded-full">
                                  Compartir
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          {isSelected && (
                            <div className="flex items-center space-x-2">
                              <label htmlFor={`qty-${item.id}`} className="text-sm text-restaurant-text-light">
                                Cantidad:
                              </label>
                              <input
                                type="number"
                                id={`qty-${item.id}`}
                                min="1"
                                max="10"
                                value={quantity}
                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                className="w-16 px-2 py-1 border border-restaurant-light-wood rounded text-center text-sm focus:ring-restaurant-earth focus:border-restaurant-earth"
                              />
                            </div>
                          )}
                          
                          <div className="text-right min-w-[80px]">
                            <span className="font-bold text-lg text-restaurant-gold">
                              {item.price === 0 ? 'Incluida' : `€${item.price.toFixed(2)}`}
                            </span>
                            {isSelected && item.price > 0 && (
                              <p className="text-xs text-restaurant-text-light">
                                Total: €{((item.price * quantity).toFixed(2))}
                              </p>
                            )}
                            {isShared && item.price > 0 && participants.length > 0 && (
                              <p className="text-xs text-restaurant-text-light">
                                Por persona: €{(item.price / participants.length).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Selector de participantes para items compartidos */}
                      {isShared && (
                        <div className="mt-4 p-4 bg-restaurant-light-wood/30 rounded-lg">
                          <h5 className="font-semibold text-restaurant-text mb-3">
                            ¿Quién va a compartir {item.name}?
                          </h5>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {diners.map((diner, index) => (
                              <label key={diner.id} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={participants.includes(diner.id)}
                                  onChange={(e) => handleSharedParticipantSelection(item.id, diner.id, e.target.checked)}
                                  className="w-4 h-4 text-restaurant-gold bg-white border-restaurant-light-wood rounded focus:ring-restaurant-gold focus:ring-2"
                                />
                                <span className="text-sm text-restaurant-text">
                                  {diner.name || `Comensal ${index + 1}`}
                                </span>
                              </label>
                            ))}
                          </div>
                          {participants.length > 0 && (
                            <p className="text-xs text-restaurant-text-light mt-2">
                              {participants.length} persona{participants.length !== 1 ? 's' : ''} participando
                            </p>
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
            onClick={() => currentDinerIndex > 0 ? previousDiner() : setStep('diners')}
            className="btn-secondary"
          >
            Atrás
          </button>
          <button
            onClick={nextDiner}
            className="btn-primary"
          >
            {currentDinerIndex < diners.length - 1 ? 'Siguiente Comensal' : 'Ver Resumen'}
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
          <h1 className="section-title">Resumen de la Cuenta</h1>
          <p className="text-restaurant-text-light">
            Revisa los totales y edita cualquier pedido si es necesario
          </p>
        </div>

        {/* Resumen general */}
        <div className="card p-6 mb-8 bg-gradient-to-r from-restaurant-earth to-restaurant-wood text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Total General</h3>
              <p className="text-restaurant-cream">
                Suma de todos los pedidos individuales
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
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-restaurant-gold">
                        €{totals[diner.id]?.toFixed(2) || '0.00'}
                      </div>
                    </div>
                    <button
                      onClick={() => editDiner(index)}
                      className="btn-secondary text-sm px-4 py-2"
                    >
                      Editar
                    </button>
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
                              product.type === 'individual' ? 'bg-restaurant-earth' : 'bg-restaurant-gold'
                            }`}></span>
                            <span className="text-restaurant-text">
                              {product.name}
                            </span>
                            {product.quantity > 1 && (
                              <span className="text-restaurant-text-light">
                                (x{product.quantity})
                              </span>
                            )}
                            {product.type === 'shared' && (
                              <span className="text-restaurant-text-light">
                                entre {product.totalParticipants}
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
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-restaurant-light-wood/30 rounded-lg p-4 text-center">
                    <p className="text-sm text-restaurant-text-light">
                      No ha seleccionado ningún producto aún
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
            onClick={() => setStep('orders')}
            className="btn-secondary"
          >
            Editar Pedidos
          </button>
          <button
            onClick={resetAll}
            className="btn-primary"
          >
            Nueva División
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-8 card p-6 bg-gradient-to-r from-restaurant-cream to-restaurant-light-wood">
          <h4 className="font-semibold text-restaurant-earth mb-3">💡 Consejos</h4>
          <ul className="text-sm text-restaurant-text space-y-1">
            <li>• Puedes editar los pedidos de cualquier comensal haciendo clic en "Editar"</li>
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
    case 'diners':
      return renderDinerNames();
    case 'orders':
      return renderDinerOrders();
    case 'summary':
      return renderSummary();
    default:
      return renderSetup();
  }
};

export default SplitBill;