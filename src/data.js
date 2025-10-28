// Datos del restaurante - fácilmente editables
export const restaurantData = {
  name: "Divly",
  description: "¿Quien del grupo lleva las cuentas?",
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
    description: "Bebidas frías, calientes y alcohólicas de Almería",
    subcategories: {
      cafes: {
        name: "Cafés",
        items: [
          {
            id: "cafe-solo",
            name: "Café Solo",
            description: "Café expreso de la casa",
            price: 1.50,
            category: "bebidas",
            subcategory: "cafes"
          },
          {
            id: "cafe-leche",
            name: "Café con Leche",
            description: "Café con leche caliente",
            price: 2.00,
            category: "bebidas",
            subcategory: "cafes"
          },
          {
            id: "cafe-cortado",
            name: "Café Cortado",
            description: "Café cortado con leche",
            price: 1.80,
            category: "bebidas",
            subcategory: "cafes"
          },
          {
            id: "cafe-bombon",
            name: "Café Bombón",
            description: "Café con leche condensada",
            price: 2.20,
            category: "bebidas",
            subcategory: "cafes"
          },
          {
            id: "cafe-carajillo",
            name: "Carajillo",
            description: "Café con brandy y canela",
            price: 3.50,
            category: "bebidas",
            subcategory: "cafes"
          },
          {
            id: "descafeinado",
            name: "Descafeinado",
            description: "Café sin cafeína",
            price: 1.50,
            category: "bebidas",
            subcategory: "cafes"
          }
        ]
      },
      cervezas: {
        name: "Cervezas",
        items: [
          {
            id: "cerveza-cana",
            name: "Cerveza Caña",
            description: "Cerveza clara de barril",
            price: 2.00,
            category: "bebidas",
            subcategory: "cervezas"
          },
          {
            id: "cerveza-doble",
            name: "Cerveza Doble",
            description: "Cerveza clara de barril en vaso grande",
            price: 3.50,
            category: "bebidas",
            subcategory: "cervezas"
          },
          {
            id: "cerveza-tercio",
            name: "Tercio Alhambra",
            description: "Botellín de 33cl Alhambra",
            price: 3.00,
            category: "bebidas",
            subcategory: "cervezas"
          },
          {
            id: "cerveza-tercio-mahou",
            name: "Tercio Mahou",
            description: "Botellín de 33cl Mahou",
            price: 3.00,
            category: "bebidas",
            subcategory: "cervezas"
          },
          {
            id: "cerveza-artesanal",
            name: "Cerveza Artesanal IPA",
            description: "Cerveza artesanal India Pale Ale",
            price: 4.50,
            category: "bebidas",
            subcategory: "cervezas"
          },
          {
            id: "cerveza-sin-alcohol",
            name: "Cerveza Sin Alcohol",
            description: "Cerveza sin alcohol",
            price: 2.50,
            category: "bebidas",
            subcategory: "cervezas"
          }
        ]
      },
      vinos: {
        name: "Vinos",
        items: [
          {
            id: "vino-tinto-casa",
            name: "Vino Tinto de la Casa",
            description: "Vino tinto de la región",
            price: 3.00,
            category: "bebidas",
            subcategory: "vinos"
          },
          {
            id: "vino-blanco-casa",
            name: "Vino Blanco de la Casa",
            description: "Vino blanco de la región",
            price: 3.00,
            category: "bebidas",
            subcategory: "vinos"
          },
          {
            id: "vino-rosado",
            name: "Vino Rosado",
            description: "Vino rosado de Almería",
            price: 3.00,
            category: "bebidas",
            subcategory: "vinos"
          },
          {
            id: "tinto-verano",
            name: "Tinto de Verano",
            description: "Vino tinto con gaseosa",
            price: 4.50,
            category: "bebidas",
            subcategory: "vinos"
          },
          {
            id: "sangria-jarra",
            name: "Sangría (Jarra)",
            description: "Sangría casera, jarra 1L",
            price: 12.00,
            category: "bebidas",
            subcategory: "vinos"
          }
        ]
      },
      refrescos: {
        name: "Refrescos",
        items: [
          {
            id: "agua-mineral",
            name: "Agua Mineral",
            description: "Agua mineral natural 50cl",
            price: 1.50,
            category: "bebidas",
            subcategory: "refrescos"
          },
          {
            id: "agua-con-gas",
            name: "Agua con Gas",
            description: "Agua con gas 50cl",
            price: 1.80,
            category: "bebidas",
            subcategory: "refrescos"
          },
          {
            id: "coca-cola",
            name: "Coca-Cola",
            description: "Refresco Coca-Cola 33cl",
            price: 3.00,
            category: "bebidas",
            subcategory: "refrescos"
          },
          {
            id: "fanta-naranja",
            name: "Fanta de Naranja",
            description: "Refresco de naranja 33cl",
            price: 3.00,
            category: "bebidas",
            subcategory: "refrescos"
          },
          {
            id: "aquarius",
            name: "Aquarius",
            description: "Bebida isotónica 33cl",
            price: 3.00,
            category: "bebidas",
            subcategory: "refrescos"
          },
          {
            id: "zumo-naranja",
            name: "Zumo de Naranja Natural",
            description: "Zumo de naranja recién exprimido",
            price: 3.50,
            category: "bebidas",
            subcategory: "refrescos"
          }
        ]
      },
      copas: {
        name: "Copas",
        items: [
          {
            id: "copa-vino",
            name: "Copa de Vino",
            description: "Copa de vino tinto, blanco o rosado",
            price: 3.50,
            category: "bebidas",
            subcategory: "copas"
          },
          {
            id: "copita-jerez",
            name: "Copita de Jerez",
            description: "Jerez de la tierra",
            price: 3.50,
            category: "bebidas",
            subcategory: "copas"
          },
          {
            id: "chupito-baileys",
            name: "Chupito Baileys",
            description: "Licor cremoso Baileys",
            price: 5.00,
            category: "bebidas",
            subcategory: "copas"
          },
          {
            id: "chupito-tequila",
            name: "Chupito Tequila",
            description: "Tequila premium",
            price: 4.50,
            category: "bebidas",
            subcategory: "copas"
          },
          {
            id: "chupito-whisky",
            name: "Chupito Whisky",
            description: "Whisky escocés",
            price: 5.00,
            category: "bebidas",
            subcategory: "copas"
          }
        ]
      }
    }
  },
  
  tapas: {
    name: "Tapas",
    description: "Tapas incluidas con la bebida - Tapa extra: 3€",
    subcategories: {
      plancha: {
        name: "A la Plancha",
        items: [
          {
            id: "tapa-gambas-plancha",
            name: "Gambas a la Plancha",
            description: "Gambas frescas a la plancha con ajo",
            price: 0,
            category: "tapas",
            subcategory: "plancha"
          },
          {
            id: "tapa-calamares-plancha",
            name: "Calamares a la Plancha",
            description: "Calamares a la plancha con limón",
            price: 0,
            category: "tapas",
            subcategory: "plancha"
          },
          {
            id: "tapa-lomo-plancha",
            name: "Lomo a la Plancha",
            description: "Lomo de cerdo a la plancha",
            price: 0,
            category: "tapas",
            subcategory: "plancha"
          },
          {
            id: "tapa-sardinas-plancha",
            name: "Sardinas a la Plancha",
            description: "Sardinas frescas a la plancha",
            price: 0,
            category: "tapas",
            subcategory: "plancha"
          }
        ]
      },
      frias: {
        name: "Frías",
        items: [
          {
            id: "tapa-jamon-iberico",
            name: "Jamón Ibérico",
            description: "Jamón ibérico de bellota cortado a mano",
            price: 0,
            category: "tapas",
            subcategory: "frias"
          },
          {
            id: "tapa-queso-manchego",
            name: "Queso Manchego",
            description: "Queso manchego curado con membrillo",
            price: 0,
            category: "tapas",
            subcategory: "frias"
          },
          {
            id: "tapa-aceitunas",
            name: "Aceitunas Aliñadas",
            description: "Aceitunas de la zona aliñadas",
            price: 0,
            category: "tapas",
            subcategory: "frias"
          },
          {
            id: "tapa-anchoas",
            name: "Anchoas del Cantábrico",
            description: "Anchoas del Cantábrico con pan",
            price: 0,
            category: "tapas",
            subcategory: "frias"
          },
          {
            id: "tapa-en salazón",
            name: "Boquerones en Vinagre",
            description: "Boquerones en vinagre con ajo",
            price: 0,
            category: "tapas",
            subcategory: "frias"
          }
        ]
      },
      calientes: {
        name: "Calientes",
        items: [
          {
            id: "tapa-croquetas",
            name: "Croquetas de Jamón",
            description: "Croquetas caseras de jamón serrano",
            price: 0,
            category: "tapas",
            subcategory: "calientes"
          },
          {
            id: "tapa-gambas-ajillo",
            name: "Gambas al Ajillo",
            description: "Gambas al ajillo con guindilla",
            price: 0,
            category: "tapas",
            subcategory: "calientes"
          },
          {
            id: "tapa-huevos-rotos",
            name: "Huevos Rotos con Jamón",
            description: "Huevos fritos con jamón serrano",
            price: 0,
            category: "tapas",
            subcategory: "calientes"
          },
          {
            id: "tapa-pulpo-gallega",
            name: "Pulpo a la Gallega",
            description: "Pulpo cocido con patatas y pimentón",
            price: 0,
            category: "tapas",
            subcategory: "calientes"
          },
          {
            id: "tapa-tortilla-patatas",
            name: "Tortilla de Patatas",
            description: "Tortilla española tradicional",
            price: 0,
            category: "tapas",
            subcategory: "calientes"
          },
          {
            id: "tapa-chorizo-picante",
            name: "Chorizo al Vino",
            description: "Chorizo al vino tinto",
            price: 0,
            category: "tapas",
            subcategory: "calientes"
          }
        ]
      }
    }
  },
  
  raciones: {
    name: "Raciones",
    description: "Platos generosos para compartir",
    subcategories: {
      carnes: {
        name: "Carnes",
        items: [
          {
            id: "racion-solomillo",
            name: "Solomillo al Whisky",
            description: "Solomillo de cerdo al whisky",
            price: 16.50,
            category: "raciones",
            subcategory: "carnes"
          },
          {
            id: "racion-costillas",
            name: "Costillas de Cerdo",
            description: "Costillas a la barbacoa",
            price: 14.50,
            category: "raciones",
            subcategory: "carnes"
          },
          {
            id: "racion-carrillada",
            name: "Carrillada de Cerdo",
            description: "Carrillada ibérica estofada",
            price: 15.00,
            category: "raciones",
            subcategory: "carnes"
          },
          {
            id: "racion-pollo-especias",
            name: "Pollo con Especias",
            description: "Pollo al horno con especias",
            price: 12.50,
            category: "raciones",
            subcategory: "carnes"
          },
          {
            id: "racion-cordero",
            name: "Cordero a la Miel",
            description: "Paletilla de cordero a la miel",
            price: 18.00,
            category: "raciones",
            subcategory: "carnes"
          }
        ]
      },
      pastas: {
        name: "Pastas",
        items: [
          {
            id: "racion-pasta-carbonara",
            name: "Pasta Carbonara",
            description: "Espaguetis carbonara casera",
            price: 11.00,
            category: "raciones",
            subcategory: "pastas"
          },
          {
            id: "racion-pasta-bolognesa",
            name: "Pasta Bolognesa",
            description: "Espaguetis con salsa bolognesa",
            price: 10.50,
            category: "raciones",
            subcategory: "pastas"
          },
          {
            id: "racion-lasagna",
            name: "Lasaña de la Casa",
            description: "Lasaña de carne gratinada",
            price: 12.00,
            category: "raciones",
            subcategory: "pastas"
          },
          {
            id: "racion-pasta-arrabiata",
            name: "Pasta Arrabbiata",
            description: "Pasta picante con tomate y guindilla",
            price: 10.00,
            category: "raciones",
            subcategory: "pastas"
          }
        ]
      },
      pescados: {
        name: "Pescados",
        items: [
          {
            id: "racion-paella",
            name: "Paella Valenciana",
            description: "Paella tradicional con pollo y verduras",
            price: 18.50,
            category: "raciones",
            subcategory: "pescados"
          },
          {
            id: "racion-paella-marisco",
            name: "Paella de Marisco",
            description: "Paella con mariscos frescos",
            price: 22.00,
            category: "raciones",
            subcategory: "pescados"
          },
          {
            id: "racion-pulpo-racion",
            name: "Pulpo a la Gallega",
            description: "Ración de pulpo con patatas",
            price: 16.80,
            category: "raciones",
            subcategory: "pescados"
          },
          {
            id: "racion-pescado-frito",
            name: "Pescado Frito",
            description: "Pescado variado frito",
            price: 14.50,
            category: "raciones",
            subcategory: "pescados"
          },
          {
            id: "racion-cazuela-pescado",
            name: "Cazuela de Pescado",
            description: "Cazuela de pescado al horno",
            price: 17.00,
            category: "raciones",
            subcategory: "pescados"
          }
        ]
      },
      hamburguesas: {
        name: "Hamburguesas",
        items: [
          {
            id: "racion-hamburguesa-casa",
            name: "Hamburguesa de la Casa",
            description: "Hamburguesa con queso y bacon",
            price: 10.00,
            category: "raciones",
            subcategory: "hamburguesas"
          },
          {
            id: "racion-hamburguesa-clasica",
            name: "Hamburguesa Clásica",
            description: "Hamburguesa con lechuga, tomate y cebolla",
            price: 9.50,
            category: "raciones",
            subcategory: "hamburguesas"
          },
          {
            id: "racion-hamburguesa-especial",
            name: "Hamburguesa Especial",
            description: "Doble carne, queso y huevo",
            price: 12.00,
            category: "raciones",
            subcategory: "hamburguesas"
          },
          {
            id: "racion-hamburguesa-vegetal",
            name: "Hamburguesa Vegetal",
            description: "Hamburguesa vegetal con verduras",
            price: 9.00,
            category: "raciones",
            subcategory: "hamburguesas"
          }
        ]
      }
    }
  },
  
  guarniciones: {
    name: "Guarniciones",
    description: "Guarniciones para acompañar",
    subcategories: {
      patatas: {
        name: "Patatas",
        items: [
          {
            id: "guarnicion-patatas-fritas",
            name: "Patatas Fritas",
            description: "Patatas fritas de la casa",
            price: 4.00,
            category: "guarniciones",
            subcategory: "patatas"
          },
          {
            id: "guarnicion-patatas-bravas",
            name: "Patatas Bravas",
            description: "Patatas bravas con salsa picante",
            price: 5.00,
            category: "guarniciones",
            subcategory: "patatas"
          },
          {
            id: "guarnicion-patatas-allioli",
            name: "Patatas con Ali Oli",
            description: "Patatas con ali oli casero",
            price: 5.00,
            category: "guarniciones",
            subcategory: "patatas"
          },
          {
            id: "guarnicion-patatas-asadas",
            name: "Patatas Asadas",
            description: "Patatas asadas con hierbas",
            price: 5.50,
            category: "guarniciones",
            subcategory: "patatas"
          }
        ]
      },
      ensaladas: {
        name: "Ensaladas",
        items: [
          {
            id: "guarnicion-ensalada-mixta",
            name: "Ensalada Mixta",
            description: "Lechuga, tomate, cebolla y aceitunas",
            price: 6.00,
            category: "guarniciones",
            subcategory: "ensaladas"
          },
          {
            id: "guarnicion-ensalada-cesar",
            name: "Ensalada César",
            description: "Con pollo y salsa césar",
            price: 7.50,
            category: "guarniciones",
            subcategory: "ensaladas"
          },
          {
            id: "guarnicion-ensalada-rusa",
            name: "Ensaladilla Rusa",
            description: "Ensaladilla rusa casera",
            price: 6.50,
            category: "guarniciones",
            subcategory: "ensaladas"
          },
          {
            id: "guarnicion-ensalada-tomate",
            name: "Ensalada de Tomate",
            description: "Tomate fresco con aceite y sal",
            price: 5.00,
            category: "guarniciones",
            subcategory: "ensaladas"
          }
        ]
      }
    }
  },
  
  sinTAC: {
    name: "Sin TAC",
    description: "Productos Sin Tasa de Actividades de la Construcción",
    subcategories: {
      carnes: {
        name: "Carnes",
        items: [
          {
            id: "sintac-milanesa",
            name: "Milanesa de Pollo",
            description: "Milanesa de pollo empanada",
            price: 8.50,
            category: "sinTAC",
            subcategory: "carnes"
          },
          {
            id: "sintac-chorizo-frito",
            name: "Chorizo Frito",
            description: "Chorizo ibérico frito",
            price: 6.00,
            category: "sinTAC",
            subcategory: "carnes"
          },
          {
            id: "sintac-pincho-moruno",
            name: "Pincho Moruno",
            description: "Pinchos de carne con especias",
            price: 7.50,
            category: "sinTAC",
            subcategory: "carnes"
          }
        ]
      },
      pastas: {
        name: "Pastas",
        items: [
          {
            id: "sintac-pasta-simple",
            name: "Pasta Simple",
            description: "Pasta con aceite y ajo",
            price: 7.00,
            category: "sinTAC",
            subcategory: "pastas"
          },
          {
            id: "sintac-macarrones",
            name: "Macarrones con Tomate",
            description: "Macarrones con salsa de tomate",
            price: 7.50,
            category: "sinTAC",
            subcategory: "pastas"
          }
        ]
      },
      pescados: {
        name: "Pescados",
        items: [
          {
            id: "sintac-merluza-frita",
            name: "Merluza Frita",
            description: "Merluza fresca rebozada",
            price: 9.00,
            category: "sinTAC",
            subcategory: "pescados"
          },
          {
            id: "sintac-boquerones",
            name: "Boquerones Fritos",
            description: "Boquerones fritos rebozados",
            price: 7.50,
            category: "sinTAC",
            subcategory: "pescados"
          }
        ]
      },
      ensaladas: {
        name: "Ensaladas",
        items: [
          {
            id: "sintac-ensalada-tomate",
            name: "Ensalada de Tomate",
            description: "Tomate con aceite y orégano",
            price: 5.00,
            category: "sinTAC",
            subcategory: "ensaladas"
          }
        ]
      },
      patatas: {
        name: "Patatas",
        items: [
          {
            id: "sintac-patatas-fritas",
            name: "Patatas Fritas",
            description: "Patatas fritas",
            price: 4.00,
            category: "sinTAC",
            subcategory: "patatas"
          }
        ]
      },
      hamburguesas: {
        name: "Hamburguesas",
        items: [
          {
            id: "sintac-hamburguesa-simple",
            name: "Hamburguesa Simple",
            description: "Hamburguesa básica con queso",
            price: 8.00,
            category: "sinTAC",
            subcategory: "hamburguesas"
          }
        ]
      }
    }
  },
  
  postres: {
    name: "Postres",
    description: "Dulce final perfecto para tu comida",
    subcategories: {
      tartas: {
        name: "Tartas",
        items: [
          {
            id: "tarta-queso",
            name: "Tarta de Queso",
            description: "Tarta de queso casera con base de galleta",
            price: 5.50,
            category: "postres",
            subcategory: "tartas"
          },
          {
            id: "tarta-chocolate",
            name: "Tarta de Chocolate",
            description: "Tarta de chocolate negro intenso",
            price: 5.50,
            category: "postres",
            subcategory: "tartas"
          },
          {
            id: "tarta-santiago",
            name: "Tarta de Santiago",
            description: "Tarta tradicional de almendras",
            price: 5.00,
            category: "postres",
            subcategory: "tartas"
          },
          {
            id: "tarta-manzana",
            name: "Tarta de Manzana",
            description: "Tarta de manzana casera con canela",
            price: 5.00,
            category: "postres",
            subcategory: "tartas"
          },
          {
            id: "tarta-limón",
            name: "Tarta de Limón",
            description: "Tarta de limón con merengue",
            price: 5.50,
            category: "postres",
            subcategory: "tartas"
          },
          {
            id: "tarta-compartir",
            name: "Tarta para Compartir",
            description: "Tarta grande de queso o chocolate (4-6 personas)",
            price: 18.00,
            category: "postres",
            subcategory: "tartas"
          }
        ]
      },
      helados: {
        name: "Helados",
        items: [
          {
            id: "helado-vainilla",
            name: "Helado de Vainilla",
            description: "Helado artesanal de vainilla",
            price: 3.50,
            category: "postres",
            subcategory: "helados"
          },
          {
            id: "helado-chocolate",
            name: "Helado de Chocolate",
            description: "Helado artesanal de chocolate",
            price: 3.50,
            category: "postres",
            subcategory: "helados"
          },
          {
            id: "helado-fresa",
            name: "Helado de Fresa",
            description: "Helado artesanal de fresa",
            price: 3.50,
            category: "postres",
            subcategory: "helados"
          },
          {
            id: "helado-turron",
            name: "Helado de Turrón",
            description: "Helado artesanal de turrón",
            price: 3.80,
            category: "postres",
            subcategory: "helados"
          },
          {
            id: "tarrina-3-bolas",
            name: "Tarrina de 3 Bolas",
            description: "Elige 3 sabores diferentes de helado",
            price: 6.50,
            category: "postres",
            subcategory: "helados"
          },
          {
            id: "copa-helado",
            name: "Copa de Helado",
            description: "Copa especial con nata y sirope (3 bolas)",
            price: 7.50,
            category: "postres",
            subcategory: "helados"
          }
        ]
      },
      otrosDulces: {
        name: "Otros Dulces",
        items: [
          {
            id: "flan-casa",
            name: "Flan de la Casa",
            description: "Flan casero con nata",
            price: 4.50,
            category: "postres",
            subcategory: "otrosDulces"
          },
          {
            id: "natillas",
            name: "Natillas Caseras",
            description: "Natillas caseras con canela",
            price: 4.00,
            category: "postres",
            subcategory: "otrosDulces"
          },
          {
            id: "arroz-con-leche",
            name: "Arroz con Leche",
            description: "Arroz con leche tradicional con canela",
            price: 4.50,
            category: "postres",
            subcategory: "otrosDulces"
          },
          {
            id: "torrijas",
            name: "Torrijas",
            description: "Torrijas caseras con canela y miel",
            price: 5.00,
            category: "postres",
            subcategory: "otrosDulces"
          },
          {
            id: "mousse-chocolate",
            name: "Mousse de Chocolate",
            description: "Mousse de chocolate suave y cremoso",
            price: 5.00,
            category: "postres",
            subcategory: "otrosDulces"
          },
          {
            id: "fruta-temporada",
            name: "Fruta de Temporada",
            description: "Selección de fruta fresca de temporada",
            price: 4.00,
            category: "postres",
            subcategory: "otrosDulces"
          }
        ]
      }
    }
  }
};

// Función helper para obtener todos los productos (incluyendo subcategorías)
export const getAllProducts = () => {
  const allProducts = [];
  Object.values(menuCategories).forEach(category => {
    if (category.subcategories) {
      Object.values(category.subcategories).forEach(subcategory => {
        allProducts.push(...subcategory.items);
      });
    } else if (category.items) {
      allProducts.push(...category.items);
    }
  });
  return allProducts;
};

// Función helper para obtener productos por categoría
export const getProductsByCategory = (categoryName) => {
  return menuCategories[categoryName]?.items || [];
};
