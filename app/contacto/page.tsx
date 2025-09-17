"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "¡Mensaje enviado!",
      description: "Te contactaremos a la brevedad. ¡Gracias por escribirnos!",
    })

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })

    setIsSubmitting(false)
  }

  const handleWhatsAppContact = () => {
    const message = `Hola! Me gustaría obtener más información sobre sus productos.`
    const whatsappUrl = `https://wa.me/5491123456789?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contactanos</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¿Tenés alguna pregunta? ¡Nos encanta escucharte! Contactanos por cualquier consulta sobre nuestros productos
            o servicios.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envianos un Mensaje</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Tu nombre completo"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+54 11 1234-5678"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Asunto *
                </label>
                <Select value={formData.subject} onValueChange={handleSubjectChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccioná un asunto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consulta-producto">Consulta sobre Producto</SelectItem>
                    <SelectItem value="pedido">Estado de Pedido</SelectItem>
                    <SelectItem value="cambio-devolucion">Cambio o Devolución</SelectItem>
                    <SelectItem value="envio">Consulta sobre Envío</SelectItem>
                    <SelectItem value="mayorista">Ventas Mayoristas</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Contanos en qué podemos ayudarte..."
                  rows={5}
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={isSubmitting} className="w-full bg-black text-white hover:bg-gray-800">
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Mensaje
                  </>
                )}
              </Button>
            </form>

            {/* WhatsApp Alternative */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600 mb-3">¿Preferís una respuesta más rápida?</p>
              <Button
                onClick={handleWhatsAppContact}
                variant="outline"
                className="w-full bg-green-50 hover:bg-green-100"
              >
                <MessageCircle className="h-4 w-4 mr-2 text-green-600" />
                Contactar por WhatsApp
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-lg border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <Phone className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                    <p className="text-gray-600">+54 11 1234-5678</p>
                    <p className="text-sm text-gray-500">Lunes a Viernes: 9:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@modaargentina.com</p>
                    <p className="text-sm text-gray-500">Respondemos en 24hs</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                    <p className="text-gray-600">Av. Corrientes 1234</p>
                    <p className="text-gray-600">Buenos Aires, Argentina</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Horarios de Atención</h3>
                    <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                    <p className="text-gray-600">Sábados: 10:00 - 14:00</p>
                    <p className="text-gray-600">Domingos: Cerrado</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-lg border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Preguntas Frecuentes</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">¿Hacen envíos a todo el país?</h3>
                  <p className="text-gray-600 text-sm">
                    Sí, enviamos a toda Argentina. El envío es gratis para compras mayores a $50.000.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">¿Cuáles son los medios de pago?</h3>
                  <p className="text-gray-600 text-sm">
                    Aceptamos transferencia bancaria, Mercado Pago, efectivo (CABA) y tarjetas de crédito/débito.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">¿Puedo cambiar o devolver un producto?</h3>
                  <p className="text-gray-600 text-sm">
                    Sí, tenés 30 días para cambios y devoluciones. El producto debe estar en perfectas condiciones.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">¿Tienen showroom físico?</h3>
                  <p className="text-gray-600 text-sm">
                    Sí, podés visitarnos en Av. Corrientes 1234, CABA. Te recomendamos coordinar cita previa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-lg border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Cómo Llegar?</h2>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Av. Corrientes 1234, Buenos Aires</p>
                <p className="text-sm text-gray-500 mt-2">Cerca del Obelisco • Subte Línea B, C y D</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
