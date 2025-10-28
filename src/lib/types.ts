// Tipos para el sistema de carta digital

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  image?: string;
  allergens?: string[];
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
}

export interface Guest {
  id: string;
  nombre: string;
  color: string;
  items: MenuItem[];
  total: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
  subcategories?: string[];
}

export const BRAND = {
  name: "Divly",
  description: "Divide tu cuenta de forma inteligente",
  tagline: "Carta digital con división automática de cuentas"
};
