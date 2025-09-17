export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  category: string
  sizes: string[]
  colors: string[]
  images: string[]
  featured: boolean
  inStock: boolean
}

export interface Category {
  id: string
  name: string
  count: number
}

export const categories: Category[] = [
  { id: "remeras", name: "Remeras", count: 24 },
  { id: "pantalones", name: "Pantalones", count: 18 },
  { id: "vestidos", name: "Vestidos", count: 15 },
  { id: "camperas", name: "Camperas", count: 12 },
  { id: "accesorios", name: "Accesorios", count: 30 },
  { id: "calzado", name: "Calzado", count: 20 },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Remera Básica Premium",
    description:
      "Remera de algodón 100% argentino, corte clásico y colores vibrantes. Perfecta para el día a día con la comodidad que buscás.",
    price: 8500,
    originalPrice: 12000,
    discount: 30,
    category: "remeras",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Negro", "Blanco", "Gris", "Rosa"],
    images: ["/remera-b-sica-argentina.jpg"],
    featured: true,
    inStock: true,
  },
  {
    id: "2",
    name: "Jean Argentino Clásico",
    description:
      "Jean de mezclilla premium con corte recto. Diseñado y confeccionado en Argentina con los mejores materiales.",
    price: 15500,
    category: "pantalones",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Azul Clásico", "Negro", "Gris"],
    images: ["/jean-argentino-cl-sico.jpg"],
    featured: true,
    inStock: true,
  },
  {
    id: "3",
    name: "Vestido Floral Verano",
    description:
      "Vestido ligero con estampado floral, perfecto para el verano argentino. Tela fresca y diseño moderno.",
    price: 12800,
    originalPrice: 16000,
    discount: 20,
    category: "vestidos",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Floral Rosa", "Floral Azul", "Floral Verde"],
    images: ["/vestido-floral-verano-argentino.jpg"],
    featured: true,
    inStock: true,
  },
  {
    id: "4",
    name: "Campera de Cuero Premium",
    description:
      "Campera de cuero genuino argentino, diseño atemporal y calidad superior. Una inversión que durará años.",
    price: 45000,
    category: "camperas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Marrón", "Cognac"],
    images: ["/campera-cuero-argentina-premium.jpg"],
    featured: true,
    inStock: true,
  },
  {
    id: "5",
    name: "Zapatillas Urbanas",
    description: "Zapatillas cómodas para el día a día, diseño moderno y materiales de primera calidad.",
    price: 18500,
    category: "calzado",
    sizes: ["35", "36", "37", "38", "39", "40", "41", "42", "43"],
    colors: ["Blanco", "Negro", "Gris"],
    images: ["/zapatillas-urbanas-argentina.jpg"],
    featured: true,
    inStock: true,
  },
  {
    id: "6",
    name: "Bufanda de Alpaca",
    description: "Bufanda tejida con lana de alpaca argentina, suave y abrigada. Perfecta para el invierno.",
    price: 6500,
    category: "accesorios",
    sizes: ["Único"],
    colors: ["Beige", "Gris", "Negro", "Bordo"],
    images: ["/bufanda-alpaca-argentina.jpg"],
    featured: true,
    inStock: true,
  },
  {
    id: "7",
    name: "Remera Polo Clásica",
    description: "Polo de algodón peinado con bordado argentino. Elegante y cómoda para ocasiones casuales.",
    price: 9800,
    category: "remeras",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Azul Marino", "Blanco", "Verde"],
    images: ["/polo-shirt-argentina.jpg"],
    featured: false,
    inStock: true,
  },
  {
    id: "8",
    name: "Pantalón Chino Premium",
    description: "Pantalón chino de gabardina argentina, corte moderno y versatilidad para cualquier ocasión.",
    price: 13200,
    category: "pantalones",
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Beige", "Azul Marino", "Verde Oliva"],
    images: ["/chino-pants-argentina.jpg"],
    featured: false,
    inStock: true,
  },
  {
    id: "9",
    name: "Vestido Cóctel Elegante",
    description: "Vestido de noche con diseño sofisticado, perfecto para eventos especiales.",
    price: 22500,
    originalPrice: 28000,
    discount: 20,
    category: "vestidos",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Negro", "Azul Noche", "Bordo"],
    images: ["/cocktail-dress-argentina.jpg"],
    featured: false,
    inStock: true,
  },
  {
    id: "10",
    name: "Campera Bomber Urbana",
    description: "Campera bomber con diseño moderno y materiales técnicos. Ideal para el streetwear.",
    price: 16800,
    category: "camperas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Verde Militar", "Azul Marino"],
    images: ["/bomber-jacket-argentina.jpg"],
    featured: false,
    inStock: true,
  },
]

export const getFeaturedProducts = () => {
  return products.filter((product) => product.featured)
}

export const getProductsByCategory = (categoryId: string) => {
  return products.filter((product) => product.category === categoryId)
}

export const getProductById = (id: string) => {
  return products.find((product) => product.id === id)
}
