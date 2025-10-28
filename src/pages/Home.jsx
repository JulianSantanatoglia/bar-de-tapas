import { useState } from 'react';
import { Link } from 'react-router-dom';
import { restaurantData } from '../data';
import { Menu, Calculator, Zap, Smartphone, QrCode, UtensilsCrossed, Rocket, CheckCircle2, Camera, Paintbrush, Video, ArrowRight, Sparkles, Target, TrendingUp, Heart, HelpCircle, ChevronDown } from 'lucide-react';

/**
 * Página de inicio del restaurante
 * Muestra bienvenida, logo y botón para acceder a la carta
 */
const Home = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "¿Qué incluye la implementación inicial de 450€?",
      answer: "La implementación inicial incluye: carta digital personalizada con tu diseño y productos, sistema completo de división de cuenta, diseño responsive optimizado para móviles y tablets, implementación en 24-48 horas, capacitación del personal para usar la plataforma, y 2 revisiones de contenido incluidas. Todo listo para funcionar desde el día 1."
    },
    {
      question: "¿Necesito conocimientos técnicos para usar la carta digital?",
      answer: "No, no necesitas ningún conocimiento técnico. Nuestra plataforma es muy intuitiva y te proporcionamos capacitación completa para ti y tu personal. Además, te ofrecemos soporte continuo para cualquier duda o problema que pueda surgir."
    },
    {
      question: "¿Cuál es la diferencia entre el Plan Básico y el Plan Premium?",
      answer: "El Plan Básico (25€/mes) incluye hosting, dominio, hasta 30 actualizaciones de precios y menú al mes, y soporte con respuesta en 12-24 horas. El Plan Premium (40€/mes) incluye todo lo anterior pero con hasta 100 actualizaciones de precios y menú al mes, y soporte prioritario con respuesta en menos de 12 horas."
    },
    {
      question: "¿Puedo actualizar precios y productos yo mismo?",
      answer: "Sí, puedes solicitar actualizaciones de precios y productos según tu plan (30/mes en Básico, 100/mes en Premium). Simplemente contactas con nosotros por email o WhatsApp y te ayudamos a actualizar el contenido. El proceso es muy rápido y sencillo."
    },
    {
      question: "¿Los clientes necesitan descargar una app?",
      answer: "No, tu carta digital funciona directamente en el navegador web. Los clientes solo tienen que escanear el código QR de la mesa con la cámara de su móvil y acceden instantáneamente. No necesitan descargar nada ni registrarse."
    },
    {
      question: "¿Cómo funciona el sistema de división de cuenta?",
      answer: "El sistema de división de cuenta permite a los clientes seleccionar qué productos han consumido y dividir automáticamente el total entre todos los comensales. Cada persona puede ver exactamente cuánto debe pagar, lo que evita confusiones y discusiones al final de la comida."
    },
    {
      question: "¿Qué pasa si necesito cambiar muchos productos frecuentemente?",
      answer: "Si necesitas hacer cambios muy frecuentes, el Plan Premium es ideal ya que incluye hasta 100 actualizaciones al mes. Si necesitas aún más flexibilidad, podemos crear un plan personalizado que se adapte a tus necesidades específicas. Contacta con nosotros para más información."
    },
    {
      question: "¿Qué soporte técnico incluyen los planes?",
      answer: "Ambos planes incluyen soporte técnico completo por email y WhatsApp. El Plan Básico ofrece respuesta en 12-24 horas, mientras que el Plan Premium incluye soporte prioritario con respuesta en menos de 12 horas para resolver cualquier incidencia rápidamente."
    }
  ];

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
              <div className="w-32 h-32 bg-gradient-to-br from-restaurant-earth via-restaurant-wood to-restaurant-earth rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-restaurant-gold/30">
                <UtensilsCrossed className="text-white w-16 h-16" strokeWidth={1.5} />
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-2 drop-shadow-lg tracking-tight">
                {restaurantData.name}
              </h1>
              <div className="mb-6 flex items-center justify-center gap-2">
                <span className="text-sm md:text-base font-display text-restaurant-cream/80 tracking-wide">by</span>
                <img 
                  src="/images/logojsagency.png"
                  alt=".js agency" 
                  className="h-6 md:h-7 object-contain"
                />
              </div>
              <p className="text-xl md:text-2xl text-restaurant-cream/90 max-w-3xl mx-auto leading-relaxed font-light">
                {restaurantData.description}
              </p>
            </div>
            
            {/* Botones principales */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                to="/carta"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 shadow-xl hover:shadow-2xl group"
              >
                <Menu size={20} className="group-hover:scale-110 transition-transform" />
                Ver nuestra carta
              </Link>
              <Link
                to="/dividir-cuenta"
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center gap-2 shadow-xl hover:shadow-2xl group"
              >
                <Calculator size={20} className="group-hover:scale-110 transition-transform" />
                Dividir cuenta
              </Link>
            </div>
            
            {/* QR Code Info */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md mx-auto border border-white/20">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <QrCode className="text-white w-6 h-6" />
                <span className="text-white font-semibold">Escanea el QR de tu mesa</span>
              </div>
              <p className="text-restaurant-cream/90 text-sm">
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
            <div className="card p-8 text-center hover:scale-105 transition-transform group">
              <div className="w-20 h-20 bg-gradient-to-br from-restaurant-earth to-restaurant-wood rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <Zap className="w-10 h-10 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-semibold text-restaurant-text mb-4">Solución inteligente</h3>
              <p className="text-restaurant-text-light leading-relaxed">
                Carta digital moderna y sistema automático de división de cuentas. 
                Los clientes pueden ver el menú y calcular fácilmente cuánto debe pagar cada uno.
              </p>
            </div>
            
            <div className="card p-8 text-center hover:scale-105 transition-transform group">
              <div className="w-20 h-20 bg-gradient-to-br from-restaurant-earth to-restaurant-wood rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <Smartphone className="w-10 h-10 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-semibold text-restaurant-text mb-4">Carta digital</h3>
              <p className="text-restaurant-text-light leading-relaxed">
                Menú digital completo y fácil de navegar desde cualquier dispositivo. 
                Sin contacto físico, experiencia moderna y segura.
              </p>
            </div>
            
            <div className="card p-8 text-center hover:scale-105 transition-transform group">
              <div className="w-20 h-20 bg-gradient-to-br from-restaurant-earth to-restaurant-wood rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <Calculator className="w-10 h-10 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-semibold text-restaurant-text mb-4">División inteligente</h3>
              <p className="text-restaurant-text-light leading-relaxed">
                Sistema automático para dividir la cuenta entre comensales. 
                Cada persona sabe exactamente cuánto debe pagar, sin complicaciones.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de precios */}
      <div className="bg-gradient-to-b from-restaurant-cream to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Planes y precios</h2>
            <p className="text-restaurant-text-light text-lg max-w-2xl mx-auto">
              Solución completa desde 450€ de implementación inicial
            </p>
          </div>
          
          {/* Precio de Setup Inicial */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="card p-8 bg-gradient-to-r from-restaurant-gold/10 to-restaurant-bronze/10 border-2 border-restaurant-gold">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-restaurant-earth to-restaurant-wood rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Rocket className="w-10 h-10 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-3xl font-bold text-restaurant-text mb-3">Implementación inicial</h3>
                <div className="text-5xl font-bold text-restaurant-gold mb-4">450€</div>
                <p className="text-restaurant-text-light text-lg mb-6">
                  Pago único - Sin costos ocultos
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-restaurant-text">Carta digital personalizada</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-restaurant-text">Sistema de división de cuenta</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-restaurant-text">Diseño responsive optimizado</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-restaurant-text">Implementación en 24-48 horas</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-restaurant-text">Capacitación del personal</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-restaurant-text">2 revisiones incluidas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Planes Mensuales */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-restaurant-text mb-2">Planes de mantenimiento mensual</h3>
            <p className="text-restaurant-text-light">Elige el plan que mejor se adapte a tu restaurante</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Plan Básico */}
            <div className="card p-8 text-center hover:scale-105 transition-transform relative flex flex-col h-full">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-restaurant-text mb-2">Plan Básico</h3>
                <div className="text-4xl font-bold text-restaurant-gold mb-2">25€</div>
                <p className="text-restaurant-text-light">/mes</p>
              </div>
              
              <ul className="text-left space-y-3 mb-8 flex-grow">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-restaurant-text">Hosting y dominio incluido</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-restaurant-text">Actualizaciones de precios (máx. 30/mes)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-restaurant-text">Actualizaciones de menú: añadir/quitar productos (máx. 30/mes)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-restaurant-text">Soporte por email/WhatsApp</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-restaurant-text">Respuesta entre 12 y 24 horas</span>
                </li>
              </ul>
              
              <a 
                href="https://wa.me/34695547905?text=Hola,%20me%20interesa%20el%20Plan%20Básico%20de%2045€/mes%20para%20mi%20restaurante"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full mt-auto"
              >
                Solicitar Plan Básico
              </a>
            </div>

            {/* Plan Premium - Destacado */}
            <div className="card p-8 text-center hover:scale-105 transition-transform relative border-2 border-restaurant-gold flex flex-col h-full">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-restaurant-gold to-restaurant-bronze text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
                  <Sparkles className="w-4 h-4" />
                  RECOMENDADO
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-restaurant-text mb-2">Plan Premium</h3>
                <div className="text-4xl font-bold text-restaurant-gold mb-2">40€</div>
                <p className="text-restaurant-text-light">/mes</p>
              </div>
              
              <ul className="text-left space-y-3 mb-8 flex-grow">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-restaurant-text">Hosting y dominio incluido</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-restaurant-text">Actualizaciones de precios (máx. 100/mes)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-restaurant-text">Actualizaciones de menú: añadir/quitar productos (máx. 100/mes)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-restaurant-text">Soporte por email/WhatsApp</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-restaurant-text">Soporte prioritario dentro de las primeras 12 horas</span>
                </li>
              </ul>
              
              <a 
                href="https://wa.me/34695547905?text=Hola,%20me%20interesa%20el%20Plan%20Premium%20de%2075€/mes%20para%20mi%20restaurante"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full mt-auto"
              >
                Solicitar Plan Premium
              </a>
            </div>
          </div>

          {/* Servicios Adicionales */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-restaurant-text mb-2">Servicios adicionales</h3>
              <p className="text-restaurant-text-light">Complementa tu carta digital con estos servicios profesionales</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* QR Personalizados */}
              <div className="card p-6 text-center hover:scale-105 transition-transform group">
                <div className="w-16 h-16 bg-gradient-to-br from-restaurant-earth to-restaurant-wood rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                  <QrCode className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h4 className="text-lg font-semibold text-restaurant-text mb-2">Códigos QR personalizados</h4>
                <p className="text-sm text-restaurant-text-light mb-4">
                  QR con tu logo y diseño corporativo, listos para imprimir
                </p>
                <p className="text-restaurant-gold font-bold">Según cantidad</p>
                <p className="text-xs text-restaurant-text-light mt-2">Consultar presupuesto</p>
              </div>

              {/* Fotografía */}
              <div className="card p-6 text-center hover:scale-105 transition-transform group">
                <div className="w-16 h-16 bg-gradient-to-br from-restaurant-earth to-restaurant-wood rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                  <Camera className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h4 className="text-lg font-semibold text-restaurant-text mb-2">Fotografía de productos</h4>
                <p className="text-sm text-restaurant-text-light mb-4">
                  15 productos con retoque y edición profesional
                </p>
                <p className="text-restaurant-gold font-bold text-2xl">100€</p>
                <p className="text-xs text-restaurant-text-light mt-2">Por sesión</p>
              </div>

              {/* Cartelería Digital */}
              <div className="card p-6 text-center hover:scale-105 transition-transform group">
                <div className="w-16 h-16 bg-gradient-to-br from-restaurant-earth to-restaurant-wood rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                  <Paintbrush className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h4 className="text-lg font-semibold text-restaurant-text mb-2">Cartelería digital</h4>
                <p className="text-sm text-restaurant-text-light mb-4">
                  Diseños profesionales para redes sociales
                </p>
                <p className="text-restaurant-gold font-bold text-2xl">30€</p>
                <p className="text-xs text-restaurant-text-light mt-2">Por pieza</p>
              </div>

              {/* Video Promocional */}
              <div className="card p-6 text-center hover:scale-105 transition-transform group">
                <div className="w-16 h-16 bg-gradient-to-br from-restaurant-earth to-restaurant-wood rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                  <Video className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h4 className="text-lg font-semibold text-restaurant-text mb-2">Video promocional</h4>
                <p className="text-sm text-restaurant-text-light mb-4">
                  Video profesional de tu menú y restaurante
                </p>
                <p className="text-restaurant-gold font-bold text-2xl">150€</p>
                <p className="text-xs text-restaurant-text-light mt-2">Por video</p>
              </div>
            </div>
          </div>
          
          {/* Nota sobre costos */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-restaurant-gold/10 to-restaurant-bronze/10 rounded-2xl p-6 max-w-3xl mx-auto border border-restaurant-gold/20">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-6 h-6 text-restaurant-gold" />
                <h4 className="text-xl font-semibold text-restaurant-text">Sin costos ocultos</h4>
              </div>
              <p className="text-restaurant-text-light leading-relaxed">
                <strong>Transparencia total:</strong> Solo pagas lo que ves. Sin cargos adicionales, sin sorpresas. 
                Tu carta digital funcionando desde el día 1 con todo incluido en el precio.
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
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                <Zap className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h4 className="font-semibold mb-2">Más rápido</h4>
              <p className="text-sm text-restaurant-cream/90">
                Los clientes consultan el menú sin esperar
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                <Target className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h4 className="font-semibold mb-2">Menos errores</h4>
              <p className="text-sm text-restaurant-cream/90">
                Cálculos automáticos y precisos para dividir cuentas
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                <TrendingUp className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h4 className="font-semibold mb-2">Mejor experiencia</h4>
              <p className="text-sm text-restaurant-cream/90">
                Clientes satisfechos con menú digital y división justa
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                <Heart className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h4 className="font-semibold mb-2">Clientes felices</h4>
              <p className="text-sm text-restaurant-cream/90">
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
                className="btn-primary bg-white text-white hover:bg-restaurant-cream inline-flex items-center gap-2"
              >
                <Smartphone size={18} />
                Solicitar demo por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Preguntas Frecuentes */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HelpCircle className="w-10 h-10 text-restaurant-gold" />
              <h2 className="section-title mb-0">Preguntas Frecuentes</h2>
            </div>
            <p className="text-restaurant-text-light text-lg max-w-2xl mx-auto">
              Resolvemos todas tus dudas sobre nuestra carta digital inteligente
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="card border-2 border-restaurant-light-wood overflow-hidden transition-all duration-300 hover:border-restaurant-gold/50"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-restaurant-cream/30 transition-colors"
                >
                  <span className="font-semibold text-restaurant-text text-lg flex-1">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-restaurant-earth flex-shrink-0 transition-transform duration-300 ${
                      openFAQ === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-5 pt-2 border-t border-restaurant-light-wood">
                    <p className="text-restaurant-text-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-restaurant-gold/10 to-restaurant-bronze/10 rounded-2xl p-6 border border-restaurant-gold/20">
              <p className="text-restaurant-text-light mb-4">
                ¿Tienes alguna otra pregunta?
              </p>
              <a 
                  href="https://wa.me/34695547905?text=Hola,%20tengo%20una%20pregunta%20sobre%20la%20carta%20digital%20inteligente"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Smartphone size={18} />
                  Contáctanos por WhatsApp
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
            <div className="card p-8 text-center hover:scale-105 transition-transform group">
              <div className="w-16 h-16 bg-gradient-to-br from-restaurant-earth to-restaurant-wood rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                <Zap className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-semibold text-restaurant-text mb-4">Soporte continuo</h3>
              <p className="text-restaurant-text-light leading-relaxed">Asistencia técnica completa y actualizaciones constantes para mantener tu carta digital funcionando perfectamente.</p>
            </div>
            
            <div className="card p-8 text-center hover:scale-105 transition-transform group">
              <div className="w-16 h-16 bg-gradient-to-br from-restaurant-earth to-restaurant-wood rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                <Calculator className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-semibold text-restaurant-text mb-4">Económico</h3>
              <p className="text-restaurant-text-light leading-relaxed">Precios competitivos sin costos ocultos. Inversión que se recupera rápidamente con mayor eficiencia.</p>
            </div>
            
            <div className="card p-8 text-center hover:scale-105 transition-transform group">
              <div className="w-16 h-16 bg-gradient-to-br from-restaurant-earth to-restaurant-wood rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                <Rocket className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-semibold text-restaurant-text mb-4">Fácil implementación</h3>
              <p className="text-restaurant-text-light leading-relaxed">Configuración rápida y sencilla. Tu carta digital estará funcionando en menos de 24 horas.</p>
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
                  className="btn-primary bg-white text-white hover:bg-restaurant-cream inline-flex items-center gap-2 group"
                >
                  Ver carta digital
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/dividir-cuenta"
                  className="btn-secondary bg-transparent border-white text-restaurant-earth hover:bg-white hover:text-restaurant-earth inline-flex items-center gap-2 group"
                >
                  Probar división inteligente
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
