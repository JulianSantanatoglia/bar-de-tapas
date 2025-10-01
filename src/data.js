// Datos del restaurante - fácilmente editables
export const restaurantData = {
  name: "Bar de Tapas",
  description: "Sabores auténticos de Andalucía en cada bocado",
  headerImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&h=400&fit=crop",
  
  // Información de contacto (para futuras funcionalidades)
  contact: {
    phone: "+34 950 123 456",
    address: "Calle Principal, 123, Almería",
    hours: "Lun-Dom: 8:00 - 23:00"
  }
};

// Productos organizados por categorías
export const menuCategories = {
  desayunos: {
    name: "Desayunos",
    description: "Empieza el día con energía",
    items: [
      {
        id: "desayuno-1",
        name: "Tostada con Tomate y Aceite",
        description: "Pan tostado con tomate natural, aceite de oliva virgen extra y sal",
        price: 3.50,
        category: "desayunos"
      },
      {
        id: "desayuno-2", 
        name: "Café con Leche y Churros",
        description: "Café con leche caliente acompañado de churros caseros",
        price: 4.20,
        category: "desayunos"
      },
      {
        id: "desayuno-3",
        name: "Tortilla Española",
        description: "Tortilla de patatas tradicional con cebolla",
        price: 5.80,
        category: "desayunos"
      },
      {
        id: "desayuno-4",
        name: "Yogur con Frutas y Miel",
        description: "Yogur natural con frutas frescas de temporada y miel de la Alpujarra",
        price: 4.50,
        category: "desayunos"
      }
    ]
  },
  
  tapas: {
    name: "Tapas",
    description: "Incluidas con la bebida - Tapas extra: 3€",
    items: [
      {
        id: "tapa-1",
        name: "Jamón Ibérico",
        description: "Jamón ibérico de bellota cortado a mano",
        price: 0,
        category: "tapas"
      },
      {
        id: "tapa-2",
        name: "Aceitunas Aliñadas",
        description: "Aceitunas de la zona aliñadas con hierbas aromáticas",
        price: 0,
        category: "tapas"
      },
      {
        id: "tapa-3",
        name: "Croquetas de Jamón",
        description: "Croquetas caseras de jamón serrano con bechamel cremosa",
        price: 0,
        category: "tapas"
      },
      {
        id: "tapa-4",
        name: "Gambas al Ajillo",
        description: "Gambas frescas al ajillo con guindilla y perejil",
        price: 0,
        category: "tapas"
      },
      {
        id: "tapa-5",
        name: "Queso Manchego",
        description: "Queso manchego curado con membrillo",
        price: 0,
        category: "tapas"
      },
      {
        id: "tapa-extra-1",
        name: "Tapa Extra - Jamón Ibérico",
        description: "Jamón ibérico de bellota cortado a mano",
        price: 3.00,
        category: "tapas"
      },
      {
        id: "tapa-extra-2",
        name: "Tapa Extra - Croquetas",
        description: "Croquetas caseras de jamón serrano con bechamel cremosa",
        price: 3.00,
        category: "tapas"
      },
      {
        id: "tapa-extra-3",
        name: "Tapa Extra - Gambas al Ajillo",
        description: "Gambas frescas al ajillo con guindilla y perejil",
        price: 3.00,
        category: "tapas"
      }
    ]
  },
  
  raciones: {
    name: "Raciones",
    description: "Platos más generosos para compartir",
    items: [
      {
        id: "racion-1",
        name: "Paella Valenciana",
        description: "Paella tradicional con pollo, conejo y verduras",
        price: 18.50,
        category: "raciones"
      },
      {
        id: "racion-2",
        name: "Pulpo a la Gallega",
        description: "Pulpo cocido con patatas, aceite de oliva y pimentón",
        price: 16.80,
        category: "raciones"
      },
      {
        id: "racion-3",
        name: "Carrillada de Cerdo",
        description: "Carrillada de cerdo ibérico estofada con verduras",
        price: 14.90,
        category: "raciones"
      },
      {
        id: "racion-4",
        name: "Ensalada Mixta",
        description: "Ensalada fresca con lechuga, tomate, cebolla, atún y huevo",
        price: 8.50,
        category: "raciones"
      }
    ]
  },
  
  bebidas: {
    name: "Bebidas",
    description: "Refréscate con nuestras bebidas",
    items: [
      {
        id: "bebida-1",
        name: "Café Solo",
        description: "Café expreso de la casa",
        price: 1.80,
        category: "bebidas"
      },
      {
        id: "bebida-2",
        name: "Café con Leche",
        description: "Café con leche caliente",
        price: 2.20,
        category: "bebidas"
      },
      {
        id: "bebida-3",
        name: "Cerveza Clara",
        description: "Cerveza clara de barril",
        price: 2.50,
        category: "bebidas"
      },
      {
        id: "bebida-4",
        name: "Vino Tinto de la Casa",
        description: "Vino tinto de la región",
        price: 3.50,
        category: "bebidas"
      },
      {
        id: "bebida-5",
        name: "Agua Mineral",
        description: "Agua mineral natural",
        price: 1.50,
        category: "bebidas"
      },
      {
        id: "bebida-6",
        name: "Zumo de Naranja",
        description: "Zumo de naranja natural recién exprimido",
        price: 3.20,
        category: "bebidas"
      }
    ]
  }
};

// Función helper para obtener todos los productos
export const getAllProducts = () => {
  const allProducts = [];
  Object.values(menuCategories).forEach(category => {
    allProducts.push(...category.items);
  });
  return allProducts;
};

// Función helper para obtener productos por categoría
export const getProductsByCategory = (categoryName) => {
  return menuCategories[categoryName]?.items || [];
};
