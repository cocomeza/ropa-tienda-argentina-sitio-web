"use client"

import Link from "next/link"
import { ShoppingBag, ArrowRight, Star, Truck, Shield, Heart } from "lucide-react"
import { getFeaturedProducts, categories } from "../data/products"
import { useCart } from "../hooks/useCart"
import { Header } from "./layout/header"
import { Footer } from "./layout/footer"

export const HomePage = () => {
  const featuredProducts = getFeaturedProducts()
  const { getFormattedPrice } = useCart()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Moda
                <span className="text-pink-500"> Argentina</span>
                <br />
                Auténtica
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Descubrí las últimas tendencias en ropa argentina. Calidad premium, diseños únicos y la mejor atención.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/productos">
                  <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                    Ver Productos <ShoppingBag size={20} />
                  </button>
                </Link>
                <Link href="/contacto">
                  <button className="border-2 border-black text-black px-8 py-4 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors">
                    Contactanos
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl flex items-center justify-center">
                <p className="text-4xl font-bold text-gray-700">👗</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Productos Destacados</h2>
            <p className="text-xl text-gray-600">Lo mejor de nuestra colección, seleccionado especialmente para vos</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/producto/${product.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    {product.discount && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                        -{product.discount}%
                      </div>
                    )}
                    <div className="w-full h-full flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                      👕
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-2xl text-gray-900">{getFormattedPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          {getFormattedPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{product.description.slice(0, 100)}...</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">(48)</span>
                      </div>
                      <ArrowRight size={20} className="text-gray-400 group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/productos">
              <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Ver Todos los Productos
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explorá por Categoría</h2>
            <p className="text-xl text-gray-600">Encontrá exactamente lo que buscás</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/productos?category=${category.id}`}>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="text-center">
                    <div className="text-4xl mb-4">👔</div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 mb-4">{category.count} productos disponibles</p>
                    <div className="flex items-center justify-center gap-2 text-black group-hover:gap-3 transition-all">
                      <span className="font-semibold">Explorar</span>
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Por qué Elegirnos?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="text-pink-600" size={24} />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-4">Envío a Todo el País</h3>
              <p className="text-gray-600">Llegamos a todos los rincones de Argentina con envíos seguros y rápidos.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-4">Calidad Garantizada</h3>
              <p className="text-gray-600">Productos 100% argentinos con la mejor calidad y materiales premium.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-green-600" size={24} />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-4">Atención Personalizada</h3>
              <p className="text-gray-600">Te acompañamos en cada compra con asesoramiento y atención única.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
