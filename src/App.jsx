import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Carta from './pages/Carta';
import SplitBill from './components/SplitBill';

/**
 * Componente principal de la aplicación
 * Configura el enrutamiento y la estructura general
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-restaurant-beige">
        {/* Barra de navegación */}
        <Navbar />
        
        {/* Contenido principal */}
        <main className="relative z-10">
          <Routes>
            {/* Página de inicio */}
            <Route path="/" element={<Home />} />
            
            {/* Página de la carta */}
            <Route path="/carta" element={<Carta />} />
            
            {/* Página para dividir cuenta */}
            <Route path="/dividir-cuenta" element={<SplitBill />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="bg-gradient-to-r from-restaurant-earth to-restaurant-wood border-t border-restaurant-light-wood mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="font-display text-xl font-bold text-white">Divly</span>
                <span className="text-restaurant-cream/80">by</span>
                <img 
                  src="/images/logojsagency.png"
                  alt=".js agency" 
                  className="h-5 object-contain"
                />
              </div>
              <p className="text-restaurant-cream text-sm mb-2">
                © 2024 Divly. Todos los derechos reservados.
              </p>
              <p className="text-restaurant-light-wood text-xs">
                Divide tu cuenta de forma inteligente
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
