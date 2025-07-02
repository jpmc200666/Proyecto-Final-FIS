"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SlideMenu from "@/components/slide-menu"
import { Type, Palette, Download, ShoppingCart, Shirt } from "lucide-react"
import type { Print, TshirtModel, TshirtColor } from "@/lib/products"

// Mock data for prints
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
  {
    id: 7,
    name: "Retro Wave",
    artist: "Neon Dreams",
    category: "Retro",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    downloads: 1340,
    price: 6.49,
    tags: ["retro", "synthwave", "neon", "80s"],
  },
  {
    id: 8,
    name: "Mountain Landscape",
    artist: "Nature Co",
    category: "Nature",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    downloads: 980,
    price: 5.49,
    tags: ["mountain", "landscape", "outdoor", "adventure"],
  },
]

// Mock data for t-shirt models
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

export default function CustomDesignPage() {
  const [selectedTshirt, setSelectedTshirt] = useState<TshirtModel>(tshirtModels[0])
  const [selectedPrint, setSelectedPrint] = useState<Print | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>("white")
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [designText, setDesignText] = useState<string>("")
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")
  const [textColor, setTextColor] = useState<string>("black")

  const tshirtColors: TshirtColor[] = [
    { name: "Blanco", value: "white", hex: "#FFFFFF" },
    { name: "Negro", value: "black", hex: "#000000" },
    { name: "Azul Marino", value: "navy", hex: "#1E3A8A" },
    { name: "Gris", value: "gray", hex: "#6B7280" },
    { name: "Rojo", value: "red", hex: "#DC2626" },
    { name: "Azul", value: "blue", hex: "#2563EB" },
  ]

  const sizes = ["S", "M", "L", "XL", "XXL"]

  const calculateTotal = (): string => {
    let total = selectedTshirt.price
    if (selectedPrint) total += selectedPrint.price
    return total.toFixed(2)
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Diseña tu camiseta personalizada</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Elige un modelo de camiseta, selecciona un diseño, añade texto personalizado y crea tu camiseta perfecta.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Design Preview */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Vista previa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                    {/* T-shirt mockup */}
                    <div
                        className="w-80 h-96 rounded-lg shadow-lg flex items-center justify-center relative"
                        style={{
                          backgroundColor: tshirtColors.find((c) => c.value === selectedColor)?.hex || "#FFFFFF",
                          border: selectedColor === "white" ? "1px solid #e5e7eb" : "none",
                        }}
                    >
                      {/* Design area */}
                      <div className="w-48 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center relative">
                        {/* Print background */}
                        {selectedPrint && (
                            <img
                                src={selectedPrint.image || "/placeholder.svg"}
                                alt={selectedPrint.name}
                                className="absolute inset-0 w-full h-full object-cover rounded opacity-80"
                            />
                        )}

                        {/* Text overlay */}
                        {designText && (
                            <div
                                className={`text-center font-bold z-10 ${
                                    fontSize === "small" ? "text-sm" : fontSize === "medium" ? "text-lg" : "text-2xl"
                                }`}
                                style={{ color: textColor }}
                            >
                              {designText}
                            </div>
                        )}

                        {/* Placeholder */}
                        {!selectedPrint && !designText && (
                            <p className="text-gray-400 text-sm text-center">
                              Selecciona un diseño o añade texto para ver tu diseño
                            </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Product Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shirt className="h-5 w-5" />
                    Detalles del producto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Camiseta seleccionada</Label>
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <img
                            src={selectedTshirt.image || "/placeholder.svg"}
                            alt={selectedTshirt.name}
                            className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{selectedTshirt.name}</p>
                          <p className="text-sm text-gray-600">{selectedTshirt.material}</p>
                          <p className="text-sm font-medium">${selectedTshirt.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedPrint && (
                      <div>
                        <Label>Diseño seleccionado</Label>
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <img
                                src={selectedPrint.image || "/placeholder.svg"}
                                alt={selectedPrint.name}
                                className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">{selectedPrint.name}</p>
                              <p className="text-sm text-gray-600">por {selectedPrint.artist}</p>
                              <p className="text-sm font-medium">${selectedPrint.price}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                  )}

                  <div>
                    <Label>Color de la camiseta</Label>
                    <div className="flex gap-2 mt-2">
                      {tshirtColors.map((color) => (
                          <button
                              key={color.value}
                              onClick={() => setSelectedColor(color.value)}
                              className={`w-8 h-8 rounded-full border-2 ${
                                  selectedColor === color.value ? "border-purple-600" : "border-gray-300"
                              }`}
                              style={{ backgroundColor: color.hex }}
                              title={color.name}
                          />
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="size">Talla</Label>
                    <Select value={selectedSize} onValueChange={setSelectedSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la talla" />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total: ${calculateTotal()}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Añadir al carrito
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Guardar diseño
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Design Tools */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Herramientas de diseño</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="tshirts" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="tshirts">
                        <Shirt className="h-4 w-4 mr-2" />
                        Camisetas
                      </TabsTrigger>
                      <TabsTrigger value="prints">
                        <Palette className="h-4 w-4 mr-2" />
                        Diseños
                      </TabsTrigger>
                      <TabsTrigger value="text">
                        <Type className="h-4 w-4 mr-2" />
                        Texto
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="tshirts" className="mt-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-base font-medium">Elige el modelo de camiseta</Label>
                          <p className="text-sm text-gray-600 mb-4">Selecciona la base perfecta para tu diseño</p>
                        </div>
                        <SlideMenu<TshirtModel>
                            items={tshirtModels}
                            onSelect={setSelectedTshirt}
                            selectedItem={selectedTshirt}
                            type="tshirts"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="prints" className="mt-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-base font-medium">Elige un diseño</Label>
                          <p className="text-sm text-gray-600 mb-4">Explora nuestra colección de diseños únicos</p>
                        </div>
                        <SlideMenu<Print>
                            items={prints}
                            onSelect={setSelectedPrint}
                            selectedItem={selectedPrint}
                            type="prints"
                            searchable={true}
                        />
                        {selectedPrint && (
                            <Button variant="outline" size="sm" onClick={() => setSelectedPrint(null)} className="w-full">
                              Quitar diseño
                            </Button>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="text" className="space-y-4 mt-6">
                      <div>
                        <Label htmlFor="design-text">Texto personalizado</Label>
                        <Textarea
                            id="design-text"
                            placeholder="Escribe tu texto aquí..."
                            value={designText}
                            onChange={(e) => setDesignText(e.target.value)}
                            className="mt-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Tamaño de fuente</Label>
                          <Select
                              value={fontSize}
                              onValueChange={(value) => {
                                if (value === "small" || value === "medium" || value === "large") {
                                  setFontSize(value)
                                }
                              }}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Pequeño</SelectItem>
                              <SelectItem value="medium">Mediano</SelectItem>
                              <SelectItem value="large">Grande</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Color del texto</Label>
                          <Select value={textColor} onValueChange={setTextColor}>
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="black">Negro</SelectItem>
                              <SelectItem value="white">Blanco</SelectItem>
                              <SelectItem value="red">Rojo</SelectItem>
                              <SelectItem value="blue">Azul</SelectItem>
                              <SelectItem value="green">Verde</SelectItem>
                              <SelectItem value="yellow">Amarillo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Design Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>Consejos de diseño</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Combina diseños con texto para creaciones únicas</li>
                    <li>• Considera el color de la camiseta al elegir el diseño</li>
                    <li>• Usa colores contrastantes para mejor legibilidad</li>
                    <li>• Previsualiza tu diseño antes de añadirlo al carrito</li>
                    <li>• Guarda tu diseño para reutilizarlo después</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
  )
}
