import { useState, useEffect } from 'react';
import MenuItem from '../components/MenuItem';
import { menuCategories } from '../data';
import { Search } from 'lucide-react';

/**
 * Página de la carta del restaurante
 * Menú con categorías y subcategorías horizontal con pestañas deslizables y buscador
 */
const Carta = () => {
  const [globalSearch, setGlobalSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(Object.keys(menuCategories)[0]);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  
  // Obtener categoría activa
  const currentCategory = menuCategories[activeCategory];
  
  // Determinar subcategoría activa
  const getActiveSubcategory = () => {
    if (!currentCategory?.subcategories) return null;
    if (activeSubcategory) return activeSubcategory;
    // Si no hay subcategoría activa, usar la primera
    return Object.keys(currentCategory.subcategories)[0];
  };
  
  const activeSubcategoryKey = getActiveSubcategory();
  
  // Buscar en todas las categorías cuando hay búsqueda global
  const searchAllCategories = (searchTerm) => {
    if (!searchTerm) return [];
    
    const results = [];
    const searchLower = searchTerm.toLowerCase();
    
    Object.entries(menuCategories).forEach(([categoryKey, category]) => {
      if (category.subcategories) {
        Object.entries(category.subcategories).forEach(([subcategoryKey, subcategory]) => {
          if (subcategory.items) {
            subcategory.items.forEach(item => {
              if (
                item.name.toLowerCase().includes(searchLower) ||
                item.description.toLowerCase().includes(searchLower)
              ) {
                results.push({
                  item,
                  categoryKey,
                  subcategoryKey,
                  categoryName: category.name,
                  subcategoryName: subcategory.name
                });
              }
            });
          }
        });
      } else if (category.items) {
        category.items.forEach(item => {
          if (
            item.name.toLowerCase().includes(searchLower) ||
            item.description.toLowerCase().includes(searchLower)
          ) {
            results.push({
              item,
              categoryKey,
              subcategoryKey: null,
              categoryName: category.name,
              subcategoryName: null
            });
          }
        });
      }
    });
    
    return results;
  };
  
  // Cambiar automáticamente a la categoría del primer resultado cuando hay búsqueda
  useEffect(() => {
    if (globalSearch.trim()) {
      const results = searchAllCategories(globalSearch);
      if (results.length > 0) {
        const firstResult = results[0];
        setActiveCategory(prev => {
          if (prev !== firstResult.categoryKey) {
            return firstResult.categoryKey;
          }
          return prev;
        });
        if (firstResult.subcategoryKey) {
          setActiveSubcategory(prev => {
            if (prev !== firstResult.subcategoryKey) {
              return firstResult.subcategoryKey;
            }
            return prev;
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalSearch]);
  
  // Obtener productos a mostrar
  const getProductsToShow = () => {
    // Si hay búsqueda global, mostrar resultados de todas las categorías
    if (globalSearch.trim()) {
      const results = searchAllCategories(globalSearch);
      return results.map(result => result.item);
    }
    
    // Si no hay búsqueda, mostrar productos de la categoría/subcategoría activa
    if (!currentCategory) return [];
    
    let products = [];
    
    if (currentCategory.subcategories) {
      // Si hay subcategorías
      const subcategory = currentCategory.subcategories[activeSubcategoryKey];
      if (subcategory && subcategory.items) {
        products = subcategory.items;
      }
    } else if (currentCategory.items) {
      // Si no hay subcategorías, usar items directamente
      products = currentCategory.items;
    }
    
    return products;
  };
  
  const filteredItems = getProductsToShow();
  
  // Actualizar subcategoría cuando cambia la categoría
  const handleCategoryChange = (categoryKey) => {
    // Limpiar búsqueda cuando el usuario selecciona manualmente una categoría
    if (globalSearch.trim()) {
      setGlobalSearch('');
    }
    setActiveCategory(categoryKey);
    const category = menuCategories[categoryKey];
    if (category?.subcategories) {
      setActiveSubcategory(Object.keys(category.subcategories)[0]);
    } else {
      setActiveSubcategory(null);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-restaurant-beige via-restaurant-cream to-restaurant-light-wood pb-12">
      {/* Header de la carta */}
      <div className="relative overflow-hidden mb-8">
        {/* Imagen de fondo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=600&fit=crop&crop=center')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-restaurant-earth/90 via-restaurant-wood/80 to-restaurant-earth/90"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-restaurant-gold to-restaurant-bronze rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <span className="text-3xl">📋</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Nuestra Carta
            </h1>
            <p className="text-xl text-restaurant-cream max-w-3xl mx-auto leading-relaxed">
              Descubre nuestros platos tradicionales preparados con ingredientes frescos y mucho cariño
            </p>
          </div>
        </div>
      </div>
      
      {/* Buscador global */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-restaurant-text-light" />
          <input
            type="text"
            placeholder="Buscar en todo el menú..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-full pl-14 pr-4 py-4 border-2 border-restaurant-light-wood rounded-xl text-lg focus:ring-2 focus:ring-restaurant-earth focus:border-restaurant-earth outline-none shadow-lg"
          />
          {globalSearch.trim() && filteredItems.length > 0 && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <span className="text-sm text-restaurant-earth bg-restaurant-gold/20 px-3 py-1 rounded-full font-medium">
                {filteredItems.length} resultado{filteredItems.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Menú con categorías y subcategorías */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pestañas de categorías principales */}
        <div className="overflow-x-auto mb-4 pb-4 scrollbar-hide">
          <div className="flex space-x-3 min-w-max">
            {Object.entries(menuCategories).map(([categoryKey, category]) => (
              <button
                key={categoryKey}
                onClick={() => handleCategoryChange(categoryKey)}
                className={`px-6 py-3 rounded-xl font-semibold text-base whitespace-nowrap transition-all duration-300 ${
                  activeCategory === categoryKey
                    ? 'bg-gradient-to-r from-restaurant-earth to-restaurant-wood text-white shadow-lg transform scale-105'
                    : 'bg-white text-restaurant-text hover:bg-restaurant-light-wood hover:text-restaurant-earth hover:shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Pestañas de subcategorías (si existen) */}
        {currentCategory?.subcategories && Object.keys(currentCategory.subcategories).length > 0 && (
          <div className="overflow-x-auto mb-4 pb-4 scrollbar-hide">
            <div className="flex space-x-3 min-w-max">
              {Object.entries(currentCategory.subcategories).map(([subcategoryKey, subcategory]) => (
                <button
                  key={subcategoryKey}
                  onClick={() => setActiveSubcategory(subcategoryKey)}
                  className={`px-6 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                    activeSubcategoryKey === subcategoryKey
                      ? 'bg-gradient-to-r from-restaurant-gold to-restaurant-bronze text-white shadow-md'
                      : 'bg-restaurant-light-wood text-restaurant-text hover:bg-restaurant-wood hover:text-white hover:shadow-sm'
                  }`}
                >
                  {subcategory.name}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Contenido de la categoría/subcategoría activa */}
        <div className="card overflow-hidden">
          {/* Header de la categoría */}
          <div className="bg-gradient-to-r from-restaurant-light-wood to-restaurant-cream p-6 border-b">
            <h2 className="font-display text-3xl font-bold text-restaurant-earth mb-2">
              {globalSearch.trim() ? `Resultados de búsqueda: "${globalSearch}"` : currentCategory?.name}
            </h2>
            <p className="text-restaurant-text-light text-base">
              {globalSearch.trim() 
                ? `${filteredItems.length} producto${filteredItems.length !== 1 ? 's' : ''} encontrado${filteredItems.length !== 1 ? 's' : ''}`
                : currentCategory?.description}
            }
            </p>
            {!globalSearch.trim() && activeSubcategoryKey && currentCategory?.subcategories?.[activeSubcategoryKey] && (
              <p className="text-restaurant-text-light text-sm mt-2">
                📂 {currentCategory.subcategories[activeSubcategoryKey].name}
              </p>
            )}
          </div>
          
          {/* Lista de productos */}
          <div className="divide-y divide-gray-100">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  showCheckbox={false}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-restaurant-text-light text-lg">
                  {globalSearch ? `No se encontraron productos que coincidan con "${globalSearch}"` : 'No hay productos en esta categoría'}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Información adicional */}
        <div className="mt-12 bg-gradient-to-r from-restaurant-earth to-restaurant-wood rounded-2xl p-8 shadow-2xl text-white">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">
              ¿Necesitas dividir la cuenta?
            </h3>
            <p className="text-restaurant-cream mb-6 text-lg">
              Usa nuestra herramienta inteligente para calcular fácilmente tu parte de la cuenta con tus amigos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/dividir-cuenta"
                className="btn-primary bg-white text-white hover:bg-restaurant-cream"
              >
                🧮 Dividir Cuenta
              </a>
              <a
                href="/"
                className="btn-secondary bg-transparent border-white text-restaurant-earth"
              >
                🏠 Volver al Inicio
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Estilos personalizados para ocultar el scrollbar */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Carta;
