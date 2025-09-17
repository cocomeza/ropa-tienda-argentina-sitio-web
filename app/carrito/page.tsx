"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, getTotalPrice, getFormattedPrice, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50000 ? 0 : 2500 // Envío gratis por compras mayores a $50,000
  const total = subtotal + shipping

  const handleQuantityChange = (id: string, size: string, color: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(id, size, color, newQuantity)
  }

  const handleRemoveItem = (id: string, size: string, color: string) => {
    removeItem(id, size, color)
    toast({
      title: "Producto eliminado",
      description: "El producto fue eliminado del carrito",
    })
  }

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "argentina10") {
      toast({
        title: "Código aplicado",
        description: "¡Descuento del 10% aplicado!",
      })
    } else {
      toast({
        title: "Código inválido",
        description: "El código promocional no es válido",
        variant: "destructive",
      })
    }
  }

  const handleCheckout = () => {
    toast({
      title: "Redirigiendo...",
      description: "Te contactaremos por WhatsApp para finalizar tu compra",
    })
    // Aquí se podría integrar con WhatsApp Business API
    const message = `Hola! Quiero finalizar mi compra:\n\n${items
      .map((item) => `• ${item.name} - Talle: ${item.size} - Color: ${item.color} - Cantidad: ${item.quantity}`)
      .join("\n")}\n\nTotal: ${getFormattedPrice(total)}`

    const whatsappUrl = `https://wa.me/5491123456789?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-600 mb-8">¡Descubrí nuestra increíble colección de moda argentina!</p>
            <Button onClick={() => router.push("/productos")} size="lg">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Ir a Comprar
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Seguir Comprando
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tu Carrito</h1>
            <p className="text-gray-600">
              {items.length} producto{items.length !== 1 ? "s" : ""} en tu carrito
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👕</span>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Talle: {item.size} • Color: {item.color}
                    </p>
                    <p className="font-bold text-xl text-gray-900">{getFormattedPrice(item.price)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(item.id, item.size, item.color, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-semibold min-w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(item.id, item.size, item.color, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(item.id, item.size, item.color)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Item Total */}
                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-bold text-lg">{getFormattedPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-end">
              <Button variant="outline" onClick={clearCart} className="text-red-500 hover:text-red-700 bg-transparent">
                <Trash2 className="h-4 w-4 mr-2" />
                Vaciar Carrito
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen del Pedido</h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Código Promocional</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ingresá tu código"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={handleApplyPromo}>
                    Aplicar
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Probá con: ARGENTINA10</p>
              </div>

              <Separator className="my-4" />

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">{getFormattedPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Envío:</span>
                  <span className="font-semibold">
                    {shipping === 0 ? <span className="text-green-600">¡Gratis!</span> : getFormattedPrice(shipping)}
                  </span>
                </div>

                {shipping === 0 && (
                  <p className="text-xs text-green-600">🎉 ¡Envío gratis por compras mayores a $50.000!</p>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>{getFormattedPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button onClick={handleCheckout} className="w-full mt-6 bg-black text-white hover:bg-gray-800" size="lg">
                Finalizar Compra por WhatsApp
              </Button>

              {/* Security Info */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  🔒 Compra segura • 🚚 Envío a todo el país • 💳 Múltiples medios de pago
                </p>
              </div>

              {/* Payment Methods */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Medios de pago disponibles:</p>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>• Transferencia bancaria</p>
                  <p>• Mercado Pago</p>
                  <p>• Efectivo (CABA)</p>
                  <p>• Tarjetas de crédito/débito</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
