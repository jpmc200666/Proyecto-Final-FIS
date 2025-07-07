"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicators,
} from "@/components/ui/carousel"
import { Star, ShoppingCart, Palette, Shirt, Truck, Heart, Download } from "lucide-react"
import type { Print, TshirtModel } from "@/lib/products"
import { useState, useEffect } from "react"


const getColorClass = (color: string) => {
  switch (color.toLowerCase()) {
    case "black":
    case "negro":
      return "bg-black"
    case "white":
    case "blanco":
    case "blanca":
      return "bg-white border border-gray-300"
    case "gray":
    case "gris":
      return "bg-gray-400"
    case "heather-gray":
      return "bg-gray-300"
    case "navy":
      return "bg-blue-900"
    case "cream":
    case "beige":
      return "bg-yellow-100"
    case "sage":
      return "bg-green-200"
    case "pink":
    case "rosa":
      return "bg-pink-300"
    case "blue":
    case "azul":
      return "bg-blue-500"
    case "red":
    case "rojo":
      return "bg-red-500"
    default:
      return "bg-gray-200"
  }
}

export default function HomePage() {
  const [prints, setPrints] = useState<Print[]>([])
  const [printsLoading, setPrintsLoading] = useState(true)
  const [printsError, setPrintsError] = useState<string | null>(null)

  const [tshirtModels, setTshirtModels] = useState<TshirtModel[]>([])
  const [tshirtsLoading, setTshirtsLoading] = useState(true)
  const [tshirtsError, setTshirtsError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch estampas
    const fetchPrints = async () => {
      try {
        const res = await fetch("http://localhost:8080/EstampaController/listadoEstampas")
        if (!res.ok) throw new Error("Error al cargar las estampas")
        const data = await res.json()
        setPrints(data)
      } catch (err: any) {
        setPrintsError(err.message || "Error desconocido")
      } finally {
        setPrintsLoading(false)
      }
    }
    // Fetch camisetas
    const fetchTshirts = async () => {
      try {
        const res = await fetch("http://localhost:8080/CamisetaController/listadoCamisetas")
        if (!res.ok) throw new Error("Error al cargar las camisetas")
        const data = await res.json()
        setTshirtModels(data)
      } catch (err: any) {
        setTshirtsError(err.message || "Error desconocido")
      } finally {
        setTshirtsLoading(false)
      }
    }
    fetchPrints()
    fetchTshirts()
  }, [])

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Diseña la camiseta que siempre soñaste!</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Elige entre miles de estampados únicos y modelos de camisetas premium. Mezcla, combina y crea tu diseño personalizado perfecto.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Link href="/custom-design">Empieza a Diseñar</Link>
              </Button>
              <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
              >
                <Link href="/products">Visita nuestro Catalogo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Miles de Estampas Unicas!</h3>
                <p className="text-gray-600">Elija entre nuestra amplia colección de diseños y obras de arte únicos.</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shirt className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Camisetas Premium</h3>
                <p className="text-gray-600">Materiales de alta calidad y ajustes perfectos para cada estilo.</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Producción rápida</h3>
                <p className="text-gray-600">Estampado y envío en un plazo de 3 a 5 días laborables, Los mas RAPIDOS del pais</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Prints Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Estampas destacadas</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Descubre los diseños de tendencia de nuestra comunidad de artistas talentosos.
              </p>
            </div>
            {printsLoading ? (
                <div className="text-center text-lg">Cargando estampas...</div>
            ) : printsError ? (
                <div className="text-center text-red-500">{printsError}</div>
            ) : (
                <Carousel className="w-full max-w-6xl mx-auto">
                  <CarouselContent>
                    {Array.from({ length: Math.ceil(prints.length / 3) }).map((_, slideIndex) => (
                        <CarouselItem key={slideIndex}>
                          <div className="grid md:grid-cols-3 gap-6 px-4">
                            {prints.slice(slideIndex * 3, slideIndex * 3 + 3).map((print) => (
                                <Card key={print.id} className="group hover:shadow-lg transition-shadow">
                                  <CardContent className="p-0">
                                    <div className="relative">
                                      {/* Si hay imágenes, muestra la primera, si no, placeholder */}
                                      <img
                                          src={print.imagenes && print.imagenes.length > 0 ? print.imagenes[0] : "/placeholder.svg"}
                                          alt={print.nombre}
                                          className="w-full h-64 object-cover rounded-t-lg"
                                      />
                                      <Badge className="absolute top-2 left-2" variant="secondary">
                                        {print.tema}
                                      </Badge>
                                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button size="sm" className="h-8 w-8 rounded-full p-0">
                                          <Heart className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" className="h-8 w-8 rounded-full p-0">
                                          <Download className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                    <div className="p-4">
                                      <h3 className="font-semibold mb-2">{print.nombre}</h3>
                                      <div className="flex items-center gap-1 mb-2">
                                        {Array.from({ length: print.rating }).map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                      </div>
                                      <p className="text-gray-600 text-sm mb-2">{print.descripcion}</p>
                                      <div className="text-lg font-bold text-purple-600">${print.precioBase}</div>
                                    </div>
                                  </CardContent>
                                  <CardFooter className="pt-0">
                                    <Link href={`/custom-design?print=${print.id}`} className="w-full">
                                      <Button className="w-full">Diseña ya</Button>
                                    </Link>
                                  </CardFooter>
                                </Card>
                            ))}
                          </div>
                        </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                  <CarouselIndicators />
                </Carousel>
            )}
            <div className="text-center mt-8">
              <Link href="/prints">
                <Button size="lg" variant="outline">
                  Explora todas las Estampas
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* T-Shirt Models Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Modelos de Camisetas Premium</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Elige la base perfecta para tu diseño personalizado de nuestra colección de camisetas de alta calidad.
              </p>
            </div>
            {tshirtsLoading ? (
                <div className="text-center text-lg">Cargando camisetas...</div>
            ) : tshirtsError ? (
                <div className="text-center text-red-500">{tshirtsError}</div>
            ) : (
                <Carousel className="w-full max-w-6xl mx-auto">
                  <CarouselContent>
                    {Array.from({ length: Math.ceil(tshirtModels.length / 3) }).map((_, slideIndex) => (
                        <CarouselItem key={slideIndex}>
                          <div className="grid md:grid-cols-3 gap-6 px-4">
                            {tshirtModels.slice(slideIndex * 3, slideIndex * 3 + 3).map((model) => (
                                <Card key={model.id} className="group hover:shadow-lg transition-shadow">
                                  <CardContent className="p-0">
                                    <div className="relative">
                                      <img
                                          src={model.urlImagen || "/placeholder.svg"}
                                          alt={`Camiseta ${model.color} ${model.talla}`}
                                          className="w-full h-64 object-cover rounded-t-lg"
                                      />
                                      <Button
                                          size="sm"
                                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <ShoppingCart className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    <div className="p-4">
                                      <h3 className="font-semibold mb-2">{model.color} - Talla {model.talla}</h3>
                                      <p className="text-sm text-gray-600 mb-2">{model.material}</p>
                                      <div className="flex gap-1 mb-2">
                                        <div
                                            className={`w-4 h-4 rounded-full ${getColorClass(model.color)}`}
                                            title={model.color}
                                        />
                                      </div>
                                      <p className="text-xs text-gray-500 mb-3">Stock: {model.stock?.capacidad ?? 0}</p>
                                      <div className="text-lg font-bold">${model.precio}</div>
                                    </div>
                                  </CardContent>
                                  <CardFooter className="pt-0">
                                    <Link href={`/custom-design?model=${model.id}`} className="w-full">
                                      <Button className="w-full">Personaliza este Modelo</Button>
                                    </Link>
                                  </CardFooter>
                                </Card>
                            ))}
                          </div>
                        </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                  <CarouselIndicators />
                </Carousel>
            )}
            <div className="text-center mt-8">
              <Link href="/models">
                <Button size="lg" variant="outline">
                  Mira Todos los Modelos de Camisetas
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Quieres crea la camiseta que siempre soñaste?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Combina cualquier estampado con cualquier modelo de camiseta para crear tu diseño único
            </p>
            <Link href="/custom-design">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Palette className="h-5 w-5 mr-2" />
                Abre la Herramienta de Diseño
              </Button>
            </Link>
          </div>
        </section>
      </div>
  )
}