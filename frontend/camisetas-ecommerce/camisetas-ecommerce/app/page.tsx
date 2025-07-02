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

const featuredPrints = [
  {
    id: 1,
    name: "Vintage Sunset",
    category: "Nature",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    downloads: 1240,
    price: 5.99,
    tags: ["vintage", "sunset", "retro"],
  },
  {
    id: 2,
    name: "Abstract Geometry",
    category: "Abstract",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    downloads: 890,
    price: 4.99,
    tags: ["geometric", "modern", "minimal"],
  },
  {
    id: 3,
    name: "Floral Pattern",
    category: "Nature",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    downloads: 2100,
    price: 6.99,
    tags: ["floral", "botanical", "elegant"],
  },
  {
    id: 4,
    name: "Urban Street Art",
    category: "Street Art",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    downloads: 756,
    price: 7.99,
    tags: ["urban", "graffiti", "edgy"],
  },
  {
    id: 5,
    name: "Minimalist Logo",
    category: "Typography",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    downloads: 1580,
    price: 3.99,
    tags: ["minimal", "logo", "clean"],
  },
  {
    id: 6,
    name: "Galaxy Space",
    category: "Space",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    downloads: 1890,
    price: 8.99,
    tags: ["space", "galaxy", "cosmic"],
  },
]

const tshirtModels = [
  {
    id: 1,
    name: "Classic Crew Neck",
    material: "100% Cotton",
    image: "/placeholder.svg?height=300&width=300",
    colors: ["white", "black", "gray", "navy"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: 19.99,
    rating: 4.8,
    reviews: 324,
  },
  {
    id: 2,
    name: "Premium V-Neck",
    material: "Organic Cotton Blend",
    image: "/placeholder.svg?height=300&width=300",
    colors: ["white", "black", "heather-gray"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    price: 24.99,
    rating: 4.9,
    reviews: 189,
  },
  {
    id: 3,
    name: "Oversized Fit",
    material: "Heavy Cotton",
    image: "/placeholder.svg?height=300&width=300",
    colors: ["black", "white", "cream", "sage"],
    sizes: ["S", "M", "L", "XL"],
    price: 29.99,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: "Fitted Tee",
    material: "Cotton-Poly Blend",
    image: "/placeholder.svg?height=300&width=300",
    colors: ["white", "black", "pink", "blue"],
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 22.99,
    rating: 4.6,
    reviews: 278,
  },
  {
    id: 5,
    name: "Long Sleeve",
    material: "100% Cotton",
    image: "/placeholder.svg?height=300&width=300",
    colors: ["white", "black", "gray"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    price: 27.99,
    rating: 4.8,
    reviews: 203,
  },
  {
    id: 6,
    name: "Tank Top",
    material: "Lightweight Cotton",
    image: "/placeholder.svg?height=300&width=300",
    colors: ["white", "black", "gray", "navy", "red"],
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 17.99,
    rating: 4.5,
    reviews: 142,
  },
]

const getColorClass = (color: string) => {
  switch (color) {
    case "black":
      return "bg-black"
    case "white":
      return "bg-white border border-gray-300"
    case "gray":
      return "bg-gray-400"
    case "heather-gray":
      return "bg-gray-300"
    case "navy":
      return "bg-blue-900"
    case "cream":
      return "bg-yellow-100"
    case "sage":
      return "bg-green-200"
    case "pink":
      return "bg-pink-300"
    case "blue":
      return "bg-blue-500"
    case "red":
      return "bg-red-500"
    default:
      return "bg-gray-200"
  }
}

export default function HomePage() {
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

            <Carousel className="w-full max-w-6xl mx-auto">
              <CarouselContent>
                {Array.from({ length: Math.ceil(featuredPrints.length / 3) }).map((_, slideIndex) => (
                    <CarouselItem key={slideIndex}>
                      <div className="grid md:grid-cols-3 gap-6 px-4">
                        {featuredPrints.slice(slideIndex * 3, slideIndex * 3 + 3).map((print) => (
                            <Card key={print.id} className="group hover:shadow-lg transition-shadow">
                              <CardContent className="p-0">
                                <div className="relative">
                                  <img
                                      src={print.image || "/placeholder.svg"}
                                      alt={print.name}
                                      className="w-full h-64 object-cover rounded-t-lg"
                                  />
                                  <Badge className="absolute top-2 left-2" variant="secondary">
                                    {print.category}
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
                                  <h3 className="font-semibold mb-2">{print.name}</h3>
                                  <div className="flex items-center gap-1 mb-2">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm text-gray-600">
                                {print.rating} ({print.downloads} downloads)
                              </span>
                                  </div>
                                  <div className="flex flex-wrap gap-1 mb-3">
                                    {print.tags.map((tag) => (
                                        <Badge key={tag} variant="outline" className="text-xs">
                                          {tag}
                                        </Badge>
                                    ))}
                                  </div>
                                  <div className="text-lg font-bold text-purple-600">${print.price}</div>
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
                                      src={model.image || "/placeholder.svg"}
                                      alt={model.name}
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
                                  <h3 className="font-semibold mb-2">{model.name}</h3>
                                  <p className="text-sm text-gray-600 mb-2">{model.material}</p>
                                  <div className="flex items-center gap-1 mb-3">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm text-gray-600">
                                {model.rating} ({model.reviews} reviews)
                              </span>
                                  </div>
                                  <div className="flex gap-1 mb-2">
                                    {model.colors.map((color) => (
                                        <div
                                            key={color}
                                            className={`w-4 h-4 rounded-full ${getColorClass(color)}`}
                                            title={color}
                                        />
                                    ))}
                                  </div>
                                  <p className="text-xs text-gray-500 mb-3">Tallas: {model.sizes.join(", ")}</p>
                                  <div className="text-lg font-bold">${model.price}</div>
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

        {/* Newsletter Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Mantente Actualizado</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Recibe las últimas impresiones, nuevos modelos de camisetas e inspiración de diseño exclusiva en tu bandeja de entrada.
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <input
                  type="email"
                  placeholder="Ingresa tu e-mail"
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <Button className="bg-purple-600 hover:bg-purple-700">Subscribe</Button>
            </div>
          </div>
        </section>
      </div>
  )
}
