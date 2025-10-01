import { useState } from 'react';
import MenuSection from '../components/MenuSection';
import { menuCategories } from '../data';

/**
 * Página de la carta del restaurante
 * Muestra todas las categorías de productos organizadas por secciones
 */
const Carta = () => {
  const [activeSection, setActiveSection] = useState('desayunos');
  
  // Obtener las categorías disponibles
  const categories = Object.keys(menuCategories);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-restaurant-beige via-restaurant-cream to-restaurant-light-wood">
      {/* Header de la carta */}
      <div className="relative overflow-hidden">
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
      
      {/* Navegación por secciones */}
      <div className="bg-gradient-to-r from-white to-restaurant-cream border-b border-restaurant-light-wood sticky top-16 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-2 py-4">
            {categories.map((categoryKey) => {
              const category = menuCategories[categoryKey];
              const icons = {
                desayunos: '🌅',
                tapas: '🥘',
                raciones: '🍽️',
                bebidas: '🥤'
              };
              return (
                <button
                  key={categoryKey}
                  onClick={() => setActiveSection(categoryKey)}
                  className={`flex-shrink-0 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    activeSection === categoryKey
                      ? 'bg-gradient-to-r from-restaurant-earth to-restaurant-wood text-white shadow-lg transform scale-105'
                      : 'text-restaurant-text-light hover:bg-restaurant-light-wood hover:text-restaurant-earth hover:shadow-md'
                  }`}
                >
                  <span className="text-lg">{icons[categoryKey] || '🍽️'}</span>
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Contenido de la carta */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mostrar la sección activa */}
        {activeSection && menuCategories[activeSection] && (
          <MenuSection 
            category={menuCategories[activeSection]}
            showCheckboxes={false}
          />
        )}
        
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
                className="btn-primary bg-white text-restaurant-earth hover:bg-restaurant-cream"
              >
                🧮 Dividir Cuenta
              </a>
              <a
                href="/"
                className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-restaurant-earth"
              >
                🏠 Volver al Inicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carta;
