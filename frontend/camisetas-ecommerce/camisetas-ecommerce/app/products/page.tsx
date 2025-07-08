"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Search, Download, Heart, Palette } from "lucide-react"
import type { Print, TshirtModel, SortOption } from "@/lib/products"

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

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [filterCategory, setFilterCategory] = useState<string>("all")

  // Estado para camisetas y estampas desde la API
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

  // Adaptar el filtrado y ordenamiento a la nueva estructura de datos
  const filteredPrints: Print[] = prints.filter((print) => {
    const matchesSearch =
      (print.nombre?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (print.tema?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (print.descripcion?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || (print.tema?.toLowerCase() === filterCategory)
    return matchesSearch && matchesCategory
  })

  const filteredTshirts: TshirtModel[] = tshirtModels.filter((tshirt) => {
    const matchesSearch =
      (tshirt.color?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (tshirt.material?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || (tshirt.talla?.toLowerCase() === filterCategory)
    return matchesSearch && matchesCategory
  })

  // Helper type guards
  function isPrint(item: Print | TshirtModel): item is Print {
    return (item as Print).precioBase !== undefined
  }
  function isTshirt(item: Print | TshirtModel): item is TshirtModel {
    return (item as TshirtModel).precio !== undefined
  }

  const sortItems = <T extends Print | TshirtModel>(items: T[]): T[] => {
    return [...items].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (
            (isPrint(a) ? a.precioBase : isTshirt(a) ? a.precio : 0) -
            (isPrint(b) ? b.precioBase : isTshirt(b) ? b.precio : 0)
          )
        case "price-high":
          return (
            (isPrint(b) ? b.precioBase : isTshirt(b) ? b.precio : 0) -
            (isPrint(a) ? a.precioBase : isTshirt(a) ? a.precio : 0)
          )
        case "rating":
        case "popular":
          // Solo los Print tienen rating, para camisetas será 0
          return (isPrint(b) ? b.rating : 0) - (isPrint(a) ? a.rating : 0)
        default:
          return 0
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Explora nuestra colección</h1>
          <p className="text-gray-600">Descubre estampados increíbles y modelos de camisetas premium para tus diseños personalizados.</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nombre, tema o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={sortBy} onValueChange={value => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
                <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
                <SelectItem value="rating">Mejores Rateados</SelectItem>
                <SelectItem value="popular">Mas Populares</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs for Prints and T-Shirts */}
        <Tabs defaultValue="prints" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="prints" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Estampas ({filteredPrints.length})
            </TabsTrigger>
            <TabsTrigger value="tshirts" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Modelos de Camisetas ({filteredTshirts.length})
            </TabsTrigger>
          </TabsList>

          {/* Prints Tab */}
          <TabsContent value="prints">
            {printsLoading ? (
              <div className="text-center text-lg">Cargando estampas...</div>
            ) : printsError ? (
              <div className="text-center text-red-500">{printsError}</div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant={filterCategory === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterCategory("all")}
                    >
                      Todas las Categorías
                    </Button>
                    {[...new Set(prints.map((p) => p.tema))].filter(Boolean).map((category) => (
                      <Button
                        key={category}
                        variant={filterCategory === (category?.toLowerCase() ?? "") ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterCategory(category?.toLowerCase() ?? "")}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortItems(filteredPrints).map((print) => (
                    <Card key={print.id} className="group hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={print.imagenes?.[0]?.url || "/placeholder.svg"}
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
                          <h3 className="font-semibold mb-1">{print.nombre}</h3>
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600">
                              {print.rating}
                            </span>
                          </div>
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
              </>
            )}
          </TabsContent>

          {/* T-Shirts Tab */}
          <TabsContent value="tshirts">
            {tshirtsLoading ? (
              <div className="text-center text-lg">Cargando camisetas...</div>
            ) : tshirtsError ? (
              <div className="text-center text-red-500">{tshirtsError}</div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant={filterCategory === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterCategory("all")}
                    >
                      Todas las Tallas
                    </Button>
                    {[...new Set(tshirtModels.map((t) => t.talla))].filter(Boolean).map((category) => (
                      <Button
                        key={category}
                        variant={filterCategory === (category?.toLowerCase() ?? "") ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterCategory(category?.toLowerCase() ?? "")}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortItems(filteredTshirts).map((tshirt) => (
                    <Card key={tshirt.id} className="group hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={tshirt.urlImagen || "/placeholder.svg"}
                            alt={`Camiseta ${tshirt.color} ${tshirt.talla}`}
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
                          <h3 className="font-semibold mb-2">{tshirt.color} - Talla {tshirt.talla}</h3>
                          <p className="text-sm text-gray-600 mb-2">{tshirt.material}</p>
                          <div className="flex gap-1 mb-2">
                            <div
                              className={`w-4 h-4 rounded-full ${getColorClass(tshirt.color)}`}
                              title={tshirt.color}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mb-3">Stock: {tshirt.stock?.capacidad ?? 0}</p>
                          <div className="text-lg font-bold">${tshirt.precio}</div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Link href={`/custom-design?model=${tshirt.id}`} className="w-full">
                          <Button className="w-full">Personaliza este Modelo</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>

        {filteredPrints.length === 0 && filteredTshirts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
