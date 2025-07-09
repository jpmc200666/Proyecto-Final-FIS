"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SlideMenu from "@/components/slide-menu"
import { Type, Palette, Save, ShoppingCart, Shirt } from "lucide-react"
import type { Print, TshirtModel, TshirtColor } from "@/lib/products"
import { getAuthToken } from "@/lib/auth"



export default function CustomDesignPage() {
  // Estados para camisetas y estampas desde la API
  const [prints, setPrints] = useState<Print[]>([])
  const [printsLoading, setPrintsLoading] = useState(true)
  const [printsError, setPrintsError] = useState<string | null>(null)

  const [tshirtModels, setTshirtModels] = useState<TshirtModel[]>([])
  const [tshirtsLoading, setTshirtsLoading] = useState(true)
  const [tshirtsError, setTshirtsError] = useState<string | null>(null)

  // Estados de selección
  const [selectedTshirt, setSelectedTshirt] = useState<TshirtModel | null>(null)
  const [selectedPrint, setSelectedPrint] = useState<Print | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>("white")
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [designText, setDesignText] = useState<string>("")
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")
  const [textColor, setTextColor] = useState<string>("black")

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
        setSelectedTshirt(data[0] || null)
      } catch (err: any) {
        setTshirtsError(err.message || "Error desconocido")
      } finally {
        setTshirtsLoading(false)
      }
    }
    fetchPrints()
    fetchTshirts()
  }, [])

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
    let total = selectedTshirt?.precio ?? 0
    if (selectedPrint) total += selectedPrint.precioBase ?? 0
    return total.toFixed(2)
  }

  // Nueva función para guardar el diseño
  const handleSaveDesign = async () => {
    if (!selectedTshirt || !selectedPrint) {
      alert("Selecciona una camiseta y un diseño antes de guardar.")
      return
    }
    try {
      const token = getAuthToken()
      const response = await fetch("http://localhost:8080/CamisetaEstampadaController/creacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          camiseta: { id: selectedTshirt.id },
          costo: Number(calculateTotal()),
          estampasAplicadas: { id: selectedPrint.id },
        }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        alert(errorData.message || "Error al guardar el diseño.")
        return
      }
      alert("¡Diseño guardado exitosamente!")
    } catch (err) {
      alert("Error al guardar el diseño.")
    }
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
                      {/* Text overlay en la parte superior del mockup */}
                      {designText && (
                          <div
                              className={`absolute top-4 left-1/2 -translate-x-1/2 w-[90%] text-center font-bold z-10 ${
                                  fontSize === "small" ? "text-sm" : fontSize === "medium" ? "text-lg" : "text-2xl"
                              }`}
                              style={{ color: textColor }}
                          >
                            {designText}
                          </div>
                      )}
                      {/* Design area */}
                      <div className="w-48 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 bg-transparent" style={{ zIndex: 1 }}>
                        {/* Print background */}
                        {selectedPrint && (
                            <img
                                src={selectedPrint.imagenes?.[0]?.url || "/placeholder.svg"}
                                alt={selectedPrint.nombre}
                                className="absolute inset-0 w-full h-full object-cover rounded opacity-80"
                            />
                        )}
                        {/* Placeholder */}
                        {!selectedPrint && !designText && (
                            <p className="text-gray-400 text-sm text-center z-10">
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
                      {tshirtsLoading ? (
                        <p className="text-gray-500">Cargando camisetas...</p>
                      ) : tshirtsError ? (
                        <p className="text-red-500">{tshirtsError}</p>
                      ) : selectedTshirt ? (
                        <div className="flex items-center gap-3">
                          <img
                              src={selectedTshirt.urlImagen || "/placeholder.svg"}
                              alt={selectedTshirt.color}
                              className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{selectedTshirt.color} - Talla {selectedTshirt.talla}</p>
                            <p className="text-sm text-gray-600">{selectedTshirt.material}</p>
                            <p className="text-sm font-medium">${selectedTshirt.precio}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500">No hay camiseta seleccionada</p>
                      )}
                    </div>
                  </div>

                  {selectedPrint && (
                      <div>
                        <Label>Diseño seleccionado</Label>
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <img
                                src={selectedPrint.imagenes?.[0]?.url || "/placeholder.svg"}
                                alt={selectedPrint.nombre}
                                className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">{selectedPrint.nombre}</p>
                              <p className="text-sm text-gray-600">{selectedPrint.tema}</p>
                              <p className="text-sm font-medium">${selectedPrint.precioBase}</p>
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
                    {/*
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
                    */}
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

                      <Button variant="outline" onClick={handleSaveDesign}>
                        <Save className="h-4 w-4 mr-2" />
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
                        {tshirtsLoading ? (
                          <p className="text-gray-500">Cargando camisetas...</p>
                        ) : tshirtsError ? (
                          <p className="text-red-500">{tshirtsError}</p>
                        ) : (
                          <SlideMenu<TshirtModel>
                            items={tshirtModels}
                            onSelect={item => {
                              setSelectedTshirt(item)
                              setSelectedColor("white")
                              setSelectedSize("")
                            }}
                            selectedItem={selectedTshirt}
                            type="tshirts"
                          />
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="prints" className="mt-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-base font-medium">Elige un diseño</Label>
                          <p className="text-sm text-gray-600 mb-4">Explora nuestra colección de diseños únicos</p>
                        </div>
                        {printsLoading ? (
                          <p className="text-gray-500">Cargando estampas...</p>
                        ) : printsError ? (
                          <p className="text-red-500">{printsError}</p>
                        ) : (
                          <SlideMenu<Print>
                            items={prints}
                            onSelect={setSelectedPrint}
                            selectedItem={selectedPrint}
                            type="prints"
                            searchable={true}
                          />
                        )}
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
