import { useState } from 'react';
import MenuItem from './MenuItem';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Componente para mostrar una sección completa del menú
 * Renderiza todos los items de una categoría específica en formato de lista
 * AHORA con submenus expandibles y buscador
 */
const MenuSection = ({ 
  category, 
  showCheckboxes = false, 
  selectedItems = {}, 
  onItemSelection = null 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar items basado en el término de búsqueda
  const filteredItems = category.items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="mb-6">
      {/* Header de la sección - siempre visible */}
      <div 
        className="card cursor-pointer hover:shadow-lg transition-all duration-300"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-display font-bold text-restaurant-text">
              {category.name}
            </h2>
            {!isExpanded && (
              <span className="text-sm text-restaurant-text-light bg-restaurant-light-wood px-3 py-1 rounded-full">
                {category.items.length} productos
              </span>
            )}
          </div>
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-restaurant-earth" />
          ) : (
            <ChevronDown className="w-6 h-6 text-restaurant-earth" />
          )}
        </div>
        
        {isExpanded && (
          <div className="px-4 pb-4 border-t border-restaurant-light-wood">
            <p className="text-restaurant-text-light text-sm mt-3">
              {category.description}
            </p>
          </div>
        )}
      </div>
      
      {/* Contenido expandible */}
      {isExpanded && (
        <div className="mt-2 space-y-4">
          {/* Buscador */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-restaurant-text-light" />
            <input
              type="text"
              placeholder="Buscar en esta sección..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-restaurant-light-wood rounded-xl focus:ring-2 focus:ring-restaurant-earth focus:border-restaurant-earth outline-none"
            />
          </div>

          {/* Mensaje si no hay resultados */}
          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-restaurant-text-light">
              <p>No se encontraron productos que coincidan con "{searchTerm}"</p>
            </div>
          )}

          {/* Lista de productos */}
          {filteredItems.length > 0 && (
            <div className="space-y-2">
              {filteredItems.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  showCheckbox={showCheckboxes}
                  isSelected={selectedItems[item.id] || false}
                  onSelectionChange={onItemSelection}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default MenuSection;
