"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Star, ShoppingCart, Filter, Search } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Vintage Sunset Tee",
    price: 29.99,
    originalPrice: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    category: "vintage",
    colors: ["black", "white", "gray"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Minimalist Logo Shirt",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 89,
    category: "minimalist",
    colors: ["white", "black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 3,
    name: "Abstract Art Design",
    price: 32.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 156,
    category: "artistic",
    colors: ["black", "navy", "white"],
    sizes: ["M", "L", "XL"],
  },
  {
    id: 4,
    name: "Retro Gaming Tee",
    price: 27.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 203,
    category: "gaming",
    colors: ["black", "gray", "navy"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "Nature Photography Print",
    price: 31.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 67,
    category: "nature",
    colors: ["white", "cream"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 6,
    name: "Typography Quote Tee",
    price: 26.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.4,
    reviews: 91,
    category: "typography",
    colors: ["black", "white", "gray"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [filterCategory, setFilterCategory] = useState("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || product.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">All Products</h1>
          <p className="text-gray-600">Discover our complete collection of custom t-shirts</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="vintage">Vintage</SelectItem>
                <SelectItem value="minimalist">Minimalist</SelectItem>
                <SelectItem value="artistic">Artistic</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
                <SelectItem value="nature">Nature</SelectItem>
                <SelectItem value="typography">Typography</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  {product.originalPrice && <Badge className="absolute top-2 left-2 bg-red-500">Sale</Badge>}
                  <Button
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex gap-1 mb-2">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className={`w-4 h-4 rounded-full border-2 border-gray-300 ${
                          color === "black"
                            ? "bg-black"
                            : color === "white"
                              ? "bg-white"
                              : color === "gray"
                                ? "bg-gray-400"
                                : color === "navy"
                                  ? "bg-blue-900"
                                  : color === "cream"
                                    ? "bg-yellow-100"
                                    : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">Sizes: {product.sizes.join(", ")}</p>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Link href={`/products/${product.id}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
