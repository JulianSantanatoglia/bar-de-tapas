# 🍽️ Divly - Divide tu cuenta de forma inteligente

Una aplicación web moderna para restaurantes que combina carta digital con sistema de división de cuentas.

## ✨ Características

### 🎯 **Carta digital**
- 📱 **Diseño responsive** optimizado para móviles
- 🎨 **Interfaz moderna** con colores madera elegantes
- 🏷️ **Categorías organizadas** (Desayunos, Tapas, Raciones, Bebidas)
- 📸 **Imágenes atractivas** para mejor presentación

### 💰 **División de cuentas**
- 👥 **Sistema de comensales** (1-10 personas)
- 📝 **Consumo individual** por persona
- 🤝 **Platos compartidos** entre comensales específicos
- 🧮 **Cálculo automático** de totales
- ✏️ **Edición flexible** en cualquier momento
- 📊 **Resumen detallado** con productos específicos

### 🚀 **Tecnología**
- ⚛️ **React 19** con Hooks modernos
- 🎨 **Tailwind CSS 4** para estilos
- 🔀 **React Router** para navegación SPA
- ⚡ **Vite** para build rápido
- 📱 **PWA Ready** para instalación móvil

## 🛠️ Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone [tu-repo-url]
cd smart-cart

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build local
npm run lint         # Verificar código
npm run lint:fix     # Corregir problemas de linting
npm run clean        # Limpiar carpeta dist
npm run build:clean  # Build limpio
```

## 📦 Despliegue en Netlify

### Configuración Automática
El proyecto ya está configurado para Netlify con:
- ✅ **netlify.toml** configurado
- ✅ **Headers de seguridad** optimizados
- ✅ **Cache strategy** para assets
- ✅ **SPA redirects** configurados

### Despliegue Manual
1. **Build del proyecto:**
   ```bash
   npm run build
   ```

2. **Subir a Netlify:**
   - Arrastra la carpeta `dist/` a Netlify
   - O conecta tu repositorio Git

### Variables de Entorno
```toml
# netlify.toml ya configurado
[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--prefer-offline --no-audit --no-fund"
```

## 🎨 Personalización

### Colores del Tema
Los colores están definidos en `tailwind.config.js`:
```javascript
colors: {
  'restaurant': {
    'earth': '#8B4513',        // Madera oscura
    'wood': '#CD853F',         // Madera media
    'light-wood': '#DEB887',   // Madera clara
    'beige': '#FFF8DC',        // Fondo suave
    'cream': '#F5F5DC',        // Fondo cálido
    'gold': '#FFD700',         // Dorado
    'bronze': '#CD7F32',       // Bronce
    // ... más colores
  }
}
```

### Datos del Menú
Edita `src/data.js` para personalizar:
- 🏪 Información del restaurante
- 🍽️ Productos y precios
- 📝 Descripciones
- 🏷️ Categorías

## 📱 Funcionalidades Principales

### 1. **Configuración de Comensales**
- Selecciona número de personas (1-10)
- Asigna nombres a cada comensal
- Navegación intuitiva paso a paso

### 2. **Sistema de Consumo**
- **Individual:** Solo una persona consume
- **Compartir:** Dividir entre comensales específicos
- Cantidades personalizables
- Edición en tiempo real

### 3. **Cálculo Automático**
- Total individual por comensal
- Total general de la mesa
- División equitativa de platos compartidos
- Validación automática

### 4. **Resumen Detallado**
- Lista completa de productos por persona
- Precios específicos de cada item
- Información de compartir
- Totales finales

## 🎯 Casos de Uso

### Para Restaurantes
- 🏪 **Carta digital** sin contacto
- 📱 **QR codes** en las mesas
- 💰 **División automática** de cuentas
- 📊 **Mejor experiencia** del cliente

### Para Clientes
- 🚀 **Experiencia rápida** y moderna
- 🧮 **Sin calculadora** necesaria
- ✅ **División justa** de gastos
- 📱 **Interfaz intuitiva**

## 🔧 Estructura del Proyecto

```
src/
├── components/
│   ├── MenuItem.jsx      # Componente de producto individual
│   ├── MenuSection.jsx   # Sección de categoría
│   ├── Navbar.jsx        # Navegación principal
│   └── SplitBill.jsx     # Sistema de división de cuentas
├── pages/
│   ├── Home.jsx          # Página principal
│   └── Carta.jsx         # Página de carta
├── data.js               # Datos del restaurante y menú
├── App.jsx               # Componente principal
└── main.jsx              # Punto de entrada
```

## 📈 Optimizaciones

### Performance
- ⚡ **Code splitting** automático
- 🗜️ **Minificación** de assets
- 📦 **Bundle optimization**
- 🚀 **Lazy loading** de componentes

### SEO
- 🔍 **Meta tags** optimizados
- 📱 **Mobile-first** design
- ⚡ **Core Web Vitals** optimizados
- 🏷️ **Semantic HTML**

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto

- **Proyecto:** Divly - Divide tu cuenta de forma inteligente
- **Versión:** 1.0.0
- **Tecnología:** React + Vite + Tailwind CSS

---

⭐ ¡Si te gusta este proyecto, dale una estrella! ⭐
