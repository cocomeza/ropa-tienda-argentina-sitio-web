"use client"

import Link from "next/link"
import { ArrowRight, Star, Heart } from "lucide-react"
import type { Product } from "@/data/products"
import { useCart } from "@/hooks/useCart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list"
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const { getFormattedPrice } = useCart()

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
        <div className="flex gap-6">
          <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 relative">
            {product.discount && (
              <Badge className="absolute -top-2 -left-2 bg-red-500 text-white">-{product.discount}%</Badge>
            )}
            <span className="text-4xl">👕</span>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-xl text-gray-900">{product.name}</h3>
              <Button variant="ghost" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>

            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-2xl text-gray-900">{getFormattedPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">{getFormattedPrice(product.originalPrice)}</span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-500 ml-2">(48)</span>
              </div>

              <Link href={`/producto/${product.id}`}>
                <Button>
                  Ver Detalles
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link href={`/producto/${product.id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          {product.discount && (
            <Badge className="absolute top-4 left-4 bg-red-500 text-white z-10">-{product.discount}%</Badge>
          )}
          <div className="absolute top-4 right-4 z-10">
            <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          <div className="w-full h-full flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
            👕
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-xl text-gray-900 mb-2">{product.name}</h3>

          <div className="flex items-center gap-2 mb-3">
            <span className="font-bold text-2xl text-gray-900">{getFormattedPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">{getFormattedPrice(product.originalPrice)}</span>
            )}
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

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
  )
}
