"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Search, Download, Heart, Palette } from "lucide-react"
import type { Print, TshirtModel, SortOption } from "@/lib/products"

const prints: Print[] = [
  {
    id: 1,
    name: "Vintage Sunset",
    artist: "Sarah Chen",
    category: "Nature",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    downloads: 1240,
    price: 5.99,
    tags: ["vintage", "sunset", "retro", "nature"],
  },
  {
    id: 2,
    name: "Abstract Geometry",
    artist: "Mike Rodriguez",
    category: "Abstract",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    downloads: 890,
    price: 4.99,
    tags: ["geometric", "modern", "minimal", "abstract"],
  },
  {
    id: 3,
    name: "Floral Pattern",
    artist: "Emma Wilson",
    category: "Nature",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    downloads: 2100,
    price: 6.99,
    tags: ["floral", "botanical", "elegant", "nature"],
  },
  {
    id: 4,
    name: "Urban Street Art",
    artist: "Alex Thompson",
    category: "Street Art",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    downloads: 756,
    price: 7.99,
    tags: ["urban", "graffiti", "edgy", "street"],
  },
  {
    id: 5,
    name: "Minimalist Logo",
    artist: "David Kim",
    category: "Typography",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    downloads: 1580,
    price: 3.99,
    tags: ["minimal", "logo", "clean", "typography"],
  },
  {
    id: 6,
    name: "Galaxy Space",
    artist: "Luna Martinez",
    category: "Space",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    downloads: 1890,
    price: 8.99,
    tags: ["space", "galaxy", "cosmic", "stars"],
  },
]

const tshirtModels: TshirtModel[] = [
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
    category: "classic",
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
    category: "premium",
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
    category: "oversized",
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
    category: "fitted",
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
    category: "long-sleeve",
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
    category: "tank",
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

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [filterCategory, setFilterCategory] = useState<string>("all")

  const filteredPrints: Print[] = prints.filter((print) => {
    const matchesSearch =
        print.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        print.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        print.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = filterCategory === "all" || print.category.toLowerCase() === filterCategory
    return matchesSearch && matchesCategory
  })

  const filteredTshirts: TshirtModel[] = tshirtModels.filter((tshirt) => {
    const matchesSearch = tshirt.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || tshirt.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const sortItems = <T extends Print | TshirtModel>(items: T[]): T[] => {
    return [...items].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "popular":
          const aPopularity = "downloads" in a ? a.downloads : "reviews" in a ? a.reviews : 0
          const bPopularity = "downloads" in b ? b.downloads : "reviews" in b ? b.reviews : 0
          return bPopularity - aPopularity
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
                      placeholder="Search by name, artist, or tags..."
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
              <div className="mb-6">
                <div className="flex gap-2 flex-wrap">
                  <Button
                      variant={filterCategory === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterCategory("all")}
                  >
                    Todas las Categorías
                  </Button>
                  {["Nature", "Abstract", "Street Art", "Typography", "Space"].map((category) => (
                      <Button
                          key={category}
                          variant={filterCategory === category.toLowerCase() ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilterCategory(category.toLowerCase())}
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
                          <h3 className="font-semibold mb-1">{print.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">by {print.artist}</p>
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600">
                          {print.rating} ({print.downloads} descargas)
                        </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {print.tags.slice(0, 3).map((tag) => (
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
            </TabsContent>

            {/* T-Shirts Tab */}
            <TabsContent value="tshirts">
              <div className="mb-6">
                <div className="flex gap-2 flex-wrap">
                  <Button
                      variant={filterCategory === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterCategory("all")}
                  >
                    All Styles
                  </Button>
                  {["Classic", "Premium", "Oversized", "Fitted", "Long-sleeve", "Tank"].map((category) => (
                      <Button
                          key={category}
                          variant={filterCategory === category.toLowerCase() ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilterCategory(category.toLowerCase())}
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
                              src={tshirt.image || "/placeholder.svg"}
                              alt={tshirt.name}
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
                          <h3 className="font-semibold mb-2">{tshirt.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{tshirt.material}</p>
                          <div className="flex items-center gap-1 mb-3">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600">
                          {tshirt.rating} ({tshirt.reviews} reviews)
                        </span>
                          </div>
                          <div className="flex gap-1 mb-2">
                            {tshirt.colors.map((color) => (
                                <div key={color} className={`w-4 h-4 rounded-full ${getColorClass(color)}`} title={color} />
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mb-3">Tallas: {tshirt.sizes.join(", ")}</p>
                          <div className="text-lg font-bold">${tshirt.price}</div>
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
