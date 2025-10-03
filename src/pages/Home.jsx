import { Link } from 'react-router-dom';
import { restaurantData } from '../data';

/**
 * Página de inicio del restaurante
 * Muestra bienvenida, logo y botón para acceder a la carta
 */
const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-restaurant-beige via-restaurant-cream to-restaurant-light-wood">
      {/* Hero Section con imagen de fondo */}
      <div className="relative overflow-hidden">
        {/* Imagen de fondo del bar */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=1080&fit=crop&crop=center')`
          }}
        >
          {/* Overlay con gradiente */}
          <div className="absolute inset-0 bg-gradient-to-r from-restaurant-earth/90 via-restaurant-wood/80 to-restaurant-earth/90"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Logo del restaurante */}
            <div className="mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-restaurant-gold to-restaurant-bronze rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <span className="text-white font-bold text-4xl">🍽️</span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
                {restaurantData.name}
              </h1>
              <p className="text-xl md:text-2xl text-restaurant-cream max-w-3xl mx-auto leading-relaxed font-light">
                {restaurantData.description}
              </p>
            </div>
            
            {/* Botones principales */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                to="/carta"
                className="btn-primary text-lg px-8 py-4 inline-block shadow-xl hover:shadow-2xl"
              >
                📋 Ver nuestra carta
              </Link>
              <Link
                to="/dividir-cuenta"
                className="btn-secondary text-lg px-8 py-4 inline-block shadow-xl hover:shadow-2xl"
              >
                💰 Dividir cuenta
              </Link>
            </div>
            
            {/* QR Code Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <span className="text-2xl">📱</span>
                <span className="text-white font-semibold">Escanea el QR de tu mesa</span>
              </div>
              <p className="text-restaurant-cream text-sm">
                Accede directamente al menú y divide la cuenta con tus compañeros
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Características destacadas */}
      <div className="bg-gradient-to-b from-white to-restaurant-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">¿Por qué elegir nuestra carta digital?</h2>
              <p className="text-restaurant-text-light text-lg max-w-2xl mx-auto">
              Una solución digital moderna para modernizar tu restaurante
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-br from-restaurant-gold to-restaurant-bronze rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-restaurant-text mb-4">Solución inteligente</h3>
              <p className="text-restaurant-text-light">
                Carta digital moderna y sistema automático de división de cuentas. 
                Los clientes pueden ver el menú y calcular fácilmente cuánto debe pagar cada uno.
              </p>
            </div>
            
            <div className="card p-8 text-center hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-br from-restaurant-gold to-restaurant-bronze rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-restaurant-text mb-4">Carta digital inteligente</h3>
              <p className="text-restaurant-text-light">
                Menú digital completo y fácil de navegar desde cualquier dispositivo. 
                Sin contacto físico, experiencia moderna y segura.
              </p>
            </div>
            
            <div className="card p-8 text-center hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-br from-restaurant-gold to-restaurant-bronze rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-restaurant-text mb-4">División inteligente</h3>
              <p className="text-restaurant-text-light">
                Sistema automático para dividir la cuenta entre comensales. 
                Cada persona sabe exactamente cuánto debe pagar, sin complicaciones.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de beneficios para restaurantes */}
      <div className="bg-gradient-to-r from-restaurant-earth to-restaurant-wood py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Perfecto para tu restaurante</h2>
            <p className="text-xl text-restaurant-cream max-w-3xl mx-auto">
              Una solución digital que tus clientes van a amar y que mejorará la experiencia en tu restaurante
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold mb-2">Más rápido</h4>
              <p className="text-sm text-restaurant-cream">
                Los clientes consultan el menú sin esperar
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold mb-2">Menos errores</h4>
              <p className="text-sm text-restaurant-cream">
                Cálculos automáticos y precisos para dividir cuentas
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="font-semibold mb-2">Mejor experiencia</h4>
              <p className="text-sm text-restaurant-cream">
                Clientes satisfechos con menú digital y división justa
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">😊</span>
              </div>
              <h4 className="font-semibold mb-2">Clientes felices</h4>
              <p className="text-sm text-restaurant-cream">
                Experiencia moderna, sin contacto y división justa
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">¿Quieres implementar esto en tu restaurante?</h3>
              <p className="text-restaurant-cream mb-6">
                Contacta con nosotros para implementar la carta digital en tu restaurante
              </p>
              <a 
                href="https://wa.me/34695547905?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20la%20carta%20digital%20inteligente%20para%20mi%20restaurante"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-white text-white hover:bg-restaurant-cream inline-block"
              >
                📱 Solicitar demo por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Información del restaurante */}
      <div className="bg-gradient-to-b from-restaurant-cream to-restaurant-light-wood py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">¿Por qué elegir nuestra solución?</h2>
              <p className="text-restaurant-text-light text-lg max-w-2xl mx-auto">
              Una solución digital simple y efectiva para modernizar tu restaurante
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-restaurant-earth to-restaurant-wood rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-semibold text-restaurant-text mb-4">Soporte 24/7</h3>
              <p className="text-restaurant-text-light">Asistencia técnica completa y actualizaciones constantes para mantener tu carta digital funcionando perfectamente.</p>
            </div>
            
            <div className="card p-8 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-restaurant-earth to-restaurant-wood rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-restaurant-text mb-4">Económico</h3>
              <p className="text-restaurant-text-light">Precios competitivos sin costos ocultos. Inversión que se recupera rápidamente con mayor eficiencia.</p>
            </div>
            
            <div className="card p-8 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-restaurant-earth to-restaurant-wood rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-restaurant-text mb-4">Fácil implementación</h3>
              <p className="text-restaurant-text-light">Configuración rápida y sencilla. Tu carta digital estará funcionando en menos de 24 horas.</p>
            </div>
          </div>
          
          {/* CTA Final */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-restaurant-earth to-restaurant-wood rounded-2xl p-8 text-white max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">¡Prueba nuestra solución!</h3>
              <p className="text-restaurant-cream mb-6">
                Prueba cómo funciona nuestra carta digital y el sistema de división automática de cuentas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/carta"
                  className="btn-primary bg-white text-white hover:bg-restaurant-cream"
                >
                  Ver carta digital
                </Link>
                <Link
                  to="/dividir-cuenta"
                  className="btn-secondary bg-transparent border-white text-restaurant-earth hover:bg-white hover:text-restaurant-earth"
                >
                  Probar división inteligente
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
