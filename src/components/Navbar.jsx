import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, Calculator } from 'lucide-react';

/**
 * Componente de navegación principal
 * Barra de navegación centrada con iconos modernos
 */
const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-gradient-to-b from-white via-restaurant-cream to-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-restaurant-light-wood/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          {/* Enlaces de navegación centrados */}
          <div className="flex space-x-2 sm:space-x-4">
            <Link
              to="/"
              className={`relative px-4 sm:px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                location.pathname === '/'
                  ? 'bg-gradient-to-r from-restaurant-earth via-restaurant-wood to-restaurant-earth text-white shadow-lg transform scale-105'
                  : 'text-restaurant-text-light hover:bg-restaurant-light-wood/50 hover:text-restaurant-earth hover:shadow-md'
              }`}
            >
              <Home size={18} className="flex-shrink-0" />
              <span>Inicio</span>
            </Link>
            <Link
              to="/carta"
              className={`relative px-4 sm:px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                location.pathname === '/carta'
                  ? 'bg-gradient-to-r from-restaurant-earth via-restaurant-wood to-restaurant-earth text-white shadow-lg transform scale-105'
                  : 'text-restaurant-text-light hover:bg-restaurant-light-wood/50 hover:text-restaurant-earth hover:shadow-md'
              }`}
            >
              <Menu size={18} className="flex-shrink-0" />
              <span>Carta</span>
            </Link>
            <Link
              to="/dividir-cuenta"
              className={`relative px-4 sm:px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                location.pathname === '/dividir-cuenta'
                  ? 'bg-gradient-to-r from-restaurant-earth via-restaurant-wood to-restaurant-earth text-white shadow-lg transform scale-105'
                  : 'text-restaurant-text-light hover:bg-restaurant-light-wood/50 hover:text-restaurant-earth hover:shadow-md'
              }`}
            >
              <Calculator size={18} className="flex-shrink-0" />
              <span>Dividir</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
