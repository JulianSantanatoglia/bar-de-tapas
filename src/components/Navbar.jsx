import { Link, useLocation } from 'react-router-dom';

/**
 * Componente de navegación principal
 * Muestra el logo y enlaces de navegación
 */
const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-gradient-to-r from-white to-restaurant-cream shadow-xl sticky top-0 z-50 border-b border-restaurant-light-wood/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo del restaurante */}
          <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-restaurant-earth to-restaurant-wood rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">🍽️</span>
            </div>
            <span className="font-display text-xl font-bold text-restaurant-text hover:text-restaurant-earth transition-colors">
              Bar de Tapas
            </span>
          </Link>
          
          {/* Enlaces de navegación */}
          <div className="flex space-x-1 sm:space-x-3">
            <Link
              to="/"
              className={`px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap flex items-center space-x-2 ${
                location.pathname === '/'
                  ? 'bg-gradient-to-r from-restaurant-earth to-restaurant-wood text-white shadow-lg transform scale-105'
                  : 'text-restaurant-text-light hover:bg-restaurant-light-wood hover:text-restaurant-earth hover:shadow-md'
              }`}
            >
              <span>🏠</span>
              <span>Inicio</span>
            </Link>
            <Link
              to="/carta"
              className={`px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap flex items-center space-x-2 ${
                location.pathname === '/carta'
                  ? 'bg-gradient-to-r from-restaurant-earth to-restaurant-wood text-white shadow-lg transform scale-105'
                  : 'text-restaurant-text-light hover:bg-restaurant-light-wood hover:text-restaurant-earth hover:shadow-md'
              }`}
            >
              <span>📋</span>
              <span className="hidden sm:inline">Carta</span>
            </Link>
            <Link
              to="/dividir-cuenta"
              className={`px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap flex items-center space-x-2 ${
                location.pathname === '/dividir-cuenta'
                  ? 'bg-gradient-to-r from-restaurant-earth to-restaurant-wood text-white shadow-lg transform scale-105'
                  : 'text-restaurant-text-light hover:bg-restaurant-light-wood hover:text-restaurant-earth hover:shadow-md'
              }`}
            >
              <span>💰</span>
              <span className="hidden sm:inline">Dividir</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
