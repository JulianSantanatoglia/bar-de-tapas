/**
 * Componente para mostrar un elemento individual del menú
 * Formato moderno con nombre, descripción, precio y checkbox para dividir cuenta
 */
const MenuItem = ({ 
  item, 
  showCheckbox = false, 
  isSelected = false, 
  onSelectionChange = null 
}) => {
  // Maneja el cambio de selección del checkbox
  const handleCheckboxChange = (e) => {
    if (onSelectionChange) {
      onSelectionChange(item.id, e.target.checked);
    }
  };

  // Iconos por categoría
  const getCategoryIcon = (category) => {
    const icons = {
      desayunos: '🌅',
      tapas: '🥘',
      raciones: '🍽️',
      bebidas: '🥤'
    };
    return icons[category] || '🍽️';
  };
  
  return (
    <div className="group p-6 border-b border-restaurant-light-wood/30 hover:bg-gradient-to-r hover:from-restaurant-cream/50 hover:to-restaurant-light-wood/30 transition-all duration-300 hover:shadow-md">
      {/* Información del producto */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              {getCategoryIcon(item.category)}
            </span>
            <h3 className="font-display text-xl font-semibold text-restaurant-text group-hover:text-restaurant-earth transition-colors break-words">
              {item.name}
            </h3>
          </div>
          
          <p className="text-restaurant-text-light text-sm leading-relaxed ml-11 mb-3">
            {item.description}
          </p>
          
          {/* Checkbox para dividir cuenta */}
          {showCheckbox && (
            <div className="flex items-center space-x-3 ml-11">
              <input
                type="checkbox"
                id={`item-${item.id}`}
                checked={isSelected}
                onChange={handleCheckboxChange}
                className="w-5 h-5 text-restaurant-earth bg-white border-restaurant-light-wood rounded focus:ring-restaurant-earth focus:ring-2 transition-all duration-200"
              />
              <label 
                htmlFor={`item-${item.id}`}
                className="text-sm text-restaurant-text-light cursor-pointer hover:text-restaurant-earth transition-colors"
              >
                Incluir en mi cuenta
              </label>
            </div>
          )}
        </div>

        {/* Precio con diseño rústico mejorado */}
        <div className="flex-shrink-0 text-right">
          <div className="bg-restaurant-earth text-white px-3 py-1.5 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 whitespace-nowrap">
            <span className="font-bold text-sm">
              {item.price === 0 ? 'Incluida' : `€${item.price.toFixed(2)}`}
            </span>
          </div>
          {item.price === 0 && (
            <p className="text-xs text-restaurant-text-light mt-1 whitespace-nowrap">
              con bebida
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
