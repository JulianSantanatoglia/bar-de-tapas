import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Componente de menú colapsible con buscador
 * Usado en el divisor de cuentas
 */
const CollapsibleMenu = ({ category, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-6">
      {/* Header de la sección - siempre visible */}
      <div 
        className="card cursor-pointer hover:shadow-lg transition-all duration-300"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-xl font-display font-bold text-restaurant-text">
              {category.name}
            </h3>
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
        <div className="mt-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleMenu;
