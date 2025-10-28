import { MenuItem } from './lib/types';

// Datos del restaurante - fácilmente editables
export const restaurantData = {
  name: "Bar de Tapas",
  description: "Tapas tradicionales y ambiente mediterráneo",
  headerImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&h=400&fit=crop",
  
  // Información de contacto (para futuras funcionalidades)
  contact: {
    phone: "+34 950 123 456",
    address: "Calle Principal, 123, Almería",
    hours: "Lun-Dom: 8:00 - 23:00"
  }
};

// Productos organizados por categorías con subcategorías
export const menuCategories = {
  bebidas: {
    name: "Bebidas",
    description: "Refréscate con nuestras bebidas",
    subcategories: {
      cervezas: {
        name: "Cervezas",
        items: [
          {
            id: "cerveza-1",
            name: "Cerveza Clara (Caña)",
            description: "Cerveza clara de barril, perfecta para acompañar las tapas",
            price: 2.50,
            category: "bebidas",
            subcategory: "cervezas"
          },
          {
            id: "cerveza-2",
            name: "Cerveza Clara (Doble)",
            description: "Cerveza clara de barril en vaso grande",
            price: 4.00,
            category: "bebidas",
            subcategory: "cervezas"
          },
          {
            id: "cerveza-3",
            name: "Cerveza Sin Alcohol",
            description: "Cerveza sin alcohol, sabor auténtico",
            price: 2.80,
            category: "bebidas",
            subcategory: "cervezas"
          },
          {
            id: "cerveza-4",
            name: "Cerveza Artesanal IPA",
            description: "Cerveza artesanal India Pale Ale, sabor intenso",
            price: 4.50,
            category: "bebidas",
            subcategory: "cervezas"
          }
        ]
      },
      vinos: {
        name: "Vinos",
        items: [
          {
            id: "vino-1",
            name: "Vino Tinto de la Casa",
            description: "Vino tinto de la región, crianza 6 meses",
            price: 3.50,
            category: "bebidas",
            subcategory: "vinos"
          },
          {
            id: "vino-2",
            name: "Vino Blanco de la Casa",
            description: "Vino blanco joven, fresco y afrutado",
            price: 3.50,
            category: "bebidas",
            subcategory: "vinos"
          },
          {
            id: "vino-3",
            name: "Vino Rosado",
            description: "Vino rosado de tempranillo, perfecto para el verano",
            price: 3.80,
            category: "bebidas",
            subcategory: "vinos"
          },
          {
            id: "vino-4",
            name: "Cava Brut",
            description: "Cava brut de la casa, ideal para celebraciones",
            price: 5.50,
            category: "bebidas",
            subcategory: "vinos"
          }
        ]
      },
      refrescos: {
        name: "Refrescos",
        items: [
          {
            id: "refresco-1",
            name: "Coca-Cola",
            description: "Coca-Cola clásica",
            price: 2.80,
            category: "bebidas",
            subcategory: "refrescos"
          },
          {
            id: "refresco-2",
            name: "Fanta Naranja",
            description: "Fanta de naranja",
            price: 2.80,
            category: "bebidas",
            subcategory: "refrescos"
          },
          {
            id: "refresco-3",
            name: "Agua con Gas",
            description: "Agua mineral con gas",
            price: 2.20,
            category: "bebidas",
            subcategory: "refrescos"
          },
          {
            id: "refresco-4",
            name: "Tónica",
            description: "Tónica Schweppes",
            price: 2.80,
            category: "bebidas",
            subcategory: "refrescos"
          }
        ]
      },
      cafes: {
        name: "Cafés",
        items: [
          {
            id: "cafe-1",
            name: "Café Solo",
            description: "Café expreso de la casa",
            price: 1.80,
            category: "bebidas",
            subcategory: "cafes"
          },
          {
            id: "cafe-2",
            name: "Café con Leche",
            description: "Café con leche caliente",
            price: 2.20,
            category: "bebidas",
            subcategory: "cafes"
          },
          {
            id: "cafe-3",
            name: "Café Cortado",
            description: "Café expreso con un poco de leche",
            price: 2.00,
            category: "bebidas",
            subcategory: "cafes"
          },
          {
            id: "cafe-4",
            name: "Café Bombón",
            description: "Café expreso con leche condensada",
            price: 2.50,
            category: "bebidas",
            subcategory: "cafes"
          },
          {
            id: "cafe-5",
            name: "Café Americano",
            description: "Café largo estilo americano",
            price: 2.20,
            category: "bebidas",
            subcategory: "cafes"
          }
        ]
      },
      zumos: {
        name: "Zumos Naturales",
        items: [
          {
            id: "zumo-1",
            name: "Zumo de Naranja",
            description: "Zumo de naranja natural recién exprimido",
            price: 3.20,
            category: "bebidas",
            subcategory: "zumos"
          },
          {
            id: "zumo-2",
            name: "Zumo de Manzana",
            description: "Zumo de manzana natural",
            price: 3.20,
            category: "bebidas",
            subcategory: "zumos"
          },
          {
            id: "zumo-3",
            name: "Zumo de Piña",
            description: "Zumo de piña natural",
            price: 3.50,
            category: "bebidas",
            subcategory: "zumos"
          },
          {
            id: "zumo-4",
            name: "Zumo de Tomate",
            description: "Zumo de tomate natural con sal",
            price: 3.00,
            category: "bebidas",
            subcategory: "zumos"
          }
        ]
      },
      infusiones: {
        name: "Infusiones",
        items: [
          {
            id: "infusion-1",
            name: "Té Negro",
            description: "Té negro de la casa",
            price: 2.00,
            category: "bebidas",
            subcategory: "infusiones"
          },
          {
            id: "infusion-2",
            name: "Manzanilla",
            description: "Infusión de manzanilla relajante",
            price: 2.00,
            category: "bebidas",
            subcategory: "infusiones"
          },
          {
            id: "infusion-3",
            name: "Té Verde",
            description: "Té verde antioxidante",
            price: 2.20,
            category: "bebidas",
            subcategory: "infusiones"
          },
          {
            id: "infusion-4",
            name: "Rooibos",
            description: "Infusión de rooibos sin teína",
            price: 2.20,
            category: "bebidas",
            subcategory: "infusiones"
          }
        ]
      }
    }
  },
  
  comidas: {
    name: "Comidas",
    description: "Nuestros platos principales",
    subcategories: {
      tostadas: {
        name: "Tostadas",
        items: [
          {
            id: "tostada-1",
            name: "Tostada con Tomate y Aceite",
            description: "Pan tostado con tomate natural, aceite de oliva virgen extra y sal",
            price: 3.50,
            category: "comidas",
            subcategory: "tostadas"
          },
          {
            id: "tostada-2",
            name: "Tostada con Jamón Serrano",
            description: "Pan tostado con jamón serrano de la casa",
            price: 5.50,
            category: "comidas",
            subcategory: "tostadas"
          },
          {
            id: "tostada-3",
            name: "Tostada con Aguacate",
            description: "Pan tostado con aguacate, tomate y aceite de oliva",
            price: 4.50,
            category: "comidas",
            subcategory: "tostadas"
          },
          {
            id: "tostada-4",
            name: "Tostada con Queso y Mermelada",
            description: "Pan tostado con queso fresco y mermelada de fresa",
            price: 4.00,
            category: "comidas",
            subcategory: "tostadas"
          }
        ]
      },
      bolleria: {
        name: "Bollería",
        items: [
          {
            id: "bolleria-1",
            name: "Croissant de Mantequilla",
            description: "Croissant artesanal de mantequilla",
            price: 2.50,
            category: "comidas",
            subcategory: "bolleria"
          },
          {
            id: "bolleria-2",
            name: "Napolitana de Chocolate",
            description: "Napolitana rellena de chocolate",
            price: 2.80,
            category: "comidas",
            subcategory: "bolleria"
          },
          {
            id: "bolleria-3",
            name: "Magdalena Casera",
            description: "Magdalena casera recién horneada",
            price: 1.80,
            category: "comidas",
            subcategory: "bolleria"
          },
          {
            id: "bolleria-4",
            name: "Churros con Chocolate",
            description: "Churros caseros con chocolate caliente",
            price: 4.20,
            category: "comidas",
            subcategory: "bolleria"
          }
        ]
      },
      tapas: {
        name: "Tapas",
        description: "Incluidas con la bebida - Tapa extra: 3€",
        items: [
          {
            id: "tapa-1",
            name: "Jamón Ibérico",
            description: "Jamón ibérico de bellota cortado a mano",
            price: 0,
            category: "comidas",
            subcategory: "tapas"
          },
          {
            id: "tapa-2",
            name: "Aceitunas Aliñadas",
            description: "Aceitunas de la zona aliñadas con hierbas aromáticas",
            price: 0,
            category: "comidas",
            subcategory: "tapas"
          },
          {
            id: "tapa-3",
            name: "Croquetas de Jamón",
            description: "Croquetas caseras de jamón serrano con bechamel cremosa",
            price: 0,
            category: "comidas",
            subcategory: "tapas"
          },
          {
            id: "tapa-4",
            name: "Gambas al Ajillo",
            description: "Gambas frescas al ajillo con guindilla y perejil",
            price: 0,
            category: "comidas",
            subcategory: "tapas"
          },
          {
            id: "tapa-5",
            name: "Queso Manchego",
            description: "Queso manchego curado con membrillo",
            price: 0,
            category: "comidas",
            subcategory: "tapas"
          },
          {
            id: "tapa-6",
            name: "Tortilla Española",
            description: "Tortilla de patatas tradicional con cebolla",
            price: 0,
            category: "comidas",
            subcategory: "tapas"
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
            category: "comidas",
            subcategory: "raciones"
          },
          {
            id: "racion-2",
            name: "Pulpo a la Gallega",
            description: "Pulpo cocido con patatas, aceite de oliva y pimentón",
            price: 16.80,
            category: "comidas",
            subcategory: "raciones"
          },
          {
            id: "racion-3",
            name: "Carrillada de Cerdo",
            description: "Carrillada de cerdo ibérico estofada con verduras",
            price: 14.90,
            category: "comidas",
            subcategory: "raciones"
          },
          {
            id: "racion-4",
            name: "Ensalada Mixta",
            description: "Ensalada fresca con lechuga, tomate, cebolla, atún y huevo",
            price: 8.50,
            category: "comidas",
            subcategory: "raciones"
          },
          {
            id: "racion-5",
            name: "Pescado Frito",
            description: "Pescado fresco frito con limón",
            price: 12.50,
            category: "comidas",
            subcategory: "raciones"
          }
        ]
      }
    }
  },
  
  postres: {
    name: "Postres",
    description: "Dulces para terminar con buen sabor",
    subcategories: {
      tartas: {
        name: "Tartas",
        items: [
          {
            id: "tarta-1",
            name: "Tarta de Chocolate",
            description: "Tarta de chocolate negro con crema",
            price: 4.50,
            category: "postres",
            subcategory: "tartas"
          },
          {
            id: "tarta-2",
            name: "Tarta de Queso",
            description: "Tarta de queso con mermelada de frutos rojos",
            price: 4.20,
            category: "postres",
            subcategory: "tartas"
          },
          {
            id: "tarta-3",
            name: "Tarta de Limón",
            description: "Tarta de limón con merengue",
            price: 4.00,
            category: "postres",
            subcategory: "tartas"
          },
          {
            id: "tarta-4",
            name: "Tarta de Manzana",
            description: "Tarta de manzana casera con canela",
            price: 3.80,
            category: "postres",
            subcategory: "tartas"
          }
        ]
      },
      helado: {
        name: "Helado",
        items: [
          {
            id: "helado-1",
            name: "Helado de Vainilla",
            description: "Helado artesanal de vainilla",
            price: 3.50,
            category: "postres",
            subcategory: "helado"
          },
          {
            id: "helado-2",
            name: "Helado de Chocolate",
            description: "Helado artesanal de chocolate",
            price: 3.50,
            category: "postres",
            subcategory: "helado"
          },
          {
            id: "helado-3",
            name: "Helado de Fresa",
            description: "Helado artesanal de fresa",
            price: 3.50,
            category: "postres",
            subcategory: "helado"
          },
          {
            id: "helado-4",
            name: "Copa de Helado",
            description: "Copa con 3 bolas de helado a elegir",
            price: 4.50,
            category: "postres",
            subcategory: "helado"
          }
        ]
      }
    }
  },
  
  "sin-tac": {
    name: "Sin TAC",
    description: "Opciones sin gluten, lactosa y alérgenos",
    subcategories: {
      "sin-gluten": {
        name: "Sin Gluten",
        items: [
          {
            id: "sin-gluten-1",
            name: "Tostada Sin Gluten",
            description: "Pan sin gluten con tomate y aceite",
            price: 4.00,
            category: "sin-tac",
            subcategory: "sin-gluten"
          },
          {
            id: "sin-gluten-2",
            name: "Tortilla Sin Gluten",
            description: "Tortilla de patatas sin gluten",
            price: 6.00,
            category: "sin-tac",
            subcategory: "sin-gluten"
          },
          {
            id: "sin-gluten-3",
            name: "Ensalada Sin Gluten",
            description: "Ensalada mixta sin gluten",
            price: 9.00,
            category: "sin-tac",
            subcategory: "sin-gluten"
          }
        ]
      },
      "sin-lactosa": {
        name: "Sin Lactosa",
        items: [
          {
            id: "sin-lactosa-1",
            name: "Café Sin Lactosa",
            description: "Café con leche sin lactosa",
            price: 2.50,
            category: "sin-tac",
            subcategory: "sin-lactosa"
          },
          {
            id: "sin-lactosa-2",
            name: "Tostada Sin Lactosa",
            description: "Tostada con aceite de oliva sin lactosa",
            price: 3.50,
            category: "sin-tac",
            subcategory: "sin-lactosa"
          }
        ]
      },
      "vegano": {
        name: "Vegano",
        items: [
          {
            id: "vegano-1",
            name: "Tostada Vegana",
            description: "Tostada con aguacate y tomate",
            price: 4.50,
            category: "sin-tac",
            subcategory: "vegano"
          },
          {
            id: "vegano-2",
            name: "Ensalada Vegana",
            description: "Ensalada completa sin productos animales",
            price: 8.50,
            category: "sin-tac",
            subcategory: "vegano"
          }
        ]
      }
    }
  }
};

// Función helper para obtener todos los productos
export const getAllProducts = (): MenuItem[] => {
  const allProducts: MenuItem[] = [];
  Object.values(menuCategories).forEach(category => {
    if (category.subcategories) {
      Object.values(category.subcategories).forEach((subcategory: any) => {
        allProducts.push(...subcategory.items);
      });
    }
  });
  return allProducts;
};

// Función helper para obtener productos por categoría
export const getProductsByCategory = (categoryName: string): MenuItem[] => {
  const category = (menuCategories as any)[categoryName];
  if (!category || !category.subcategories) return [];
  
  const allProducts: MenuItem[] = [];
  Object.values(category.subcategories).forEach((subcategory: any) => {
    allProducts.push(...subcategory.items);
  });
  return allProducts;
};

// Función helper para obtener productos por subcategoría
export const getProductsBySubcategory = (categoryName: string, subcategoryName: string): MenuItem[] => {
  const category = (menuCategories as any)[categoryName];
  if (!category || !category.subcategories) return [];
  
  const subcategory = category.subcategories[subcategoryName];
  return subcategory?.items || [];
};

// Función helper para obtener todas las subcategorías de una categoría
export const getSubcategories = (categoryName: string) => {
  const category = (menuCategories as any)[categoryName];
  return category?.subcategories || {};
};