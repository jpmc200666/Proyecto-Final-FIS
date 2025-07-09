"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { getCarritoActivo, Carrito, ElementoCarrito } from "@/lib/products"

export default function CartPage() {
  const [cart, setCart] = useState<Carrito | null>(null)
  const [promoCode, setPromoCode] = useState("")

  useEffect(() => {
    const carrito = getCarritoActivo()
    setCart(carrito)
	  console.log(carrito)
  }, [])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (!cart) return
    const updatedElementos = cart.elementosCarrito.map((item) =>
      item.id === id ? { ...item, cantidad: newQuantity } : item
    ).filter(item => item.cantidad > 0)
    setCart({ ...cart, elementosCarrito: updatedElementos })
  }

  const removeItem = (id: number) => {
    if (!cart) return
    const updatedElementos = cart.elementosCarrito.filter((item) => item.id !== id)
    setCart({ ...cart, elementosCarrito: updatedElementos })
  }

  // personalizar esta función según las necesidades
  const getCartItemImage = (item: ElementoCarrito) => {
    // Ejemplo: usa una imagen personalizada para todos
    return "https://pngate.com/wp-content/uploads/2025/04/pink-rose-flower-beautiful-bud-1.png"
    // O puedes usar lógica condicional, por ejemplo:
    // if (item.camisetaEstampada?.id === 9) return "/camiseta-naruto.png"
    // return "/default-tshirt.png"
  }

  if (!cart || cart.elementosCarrito.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-6" />
            <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-600 mb-8">Parece que aún no has añadido ningún artículo a tu carrito.</p>
            <Link href="/products">
              <Button size="lg">Seguir comprando</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // El subtotal ahora viene del backend
  const subtotal = cart.totalCarrito ?? 0
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/products">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Seguir comprando
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Carrito de compras</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.elementosCarrito.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={getCartItemImage(item)}
                      alt={`Camiseta ${item.id}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {item.camisetaEstampada
                          ? `Camiseta personalizada #${item.camisetaEstampada.id}`
                          : `Camiseta personalizada`}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {/* Aquí podrías mostrar más detalles si están disponibles */}
                        Cantidad: {item.cantidad}
                      </p>
                      {item.camisetaEstampada && (
                        <p className="text-gray-600 mb-2">
                          Precio unitario: ${item.camisetaEstampada.precioCamiseta.toFixed(2)}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center">{item.cantidad}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-semibold text-lg">
                            ${((item.camisetaEstampada?.precioCamiseta ?? 0) * item.cantidad).toFixed(2)}
                          </span>
                          <Button variant="outline" size="sm" onClick={() => removeItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumen del pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Impuestos</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Código promocional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Introduce el código promocional"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline">Aplicar</Button>
                </div>
              </CardContent>
            </Card>

            <Button size="lg" className="w-full">
              Proceder al pago
            </Button>

            <div className="text-center text-sm text-gray-600">
              <p>Envío gratis en pedidos superiores a $50</p>
              <p>Política de devolución de 30 días</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
