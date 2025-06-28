"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Type, ImageIcon, Palette, Download, ShoppingCart } from "lucide-react"

export default function CustomDesignPage() {
  const [selectedColor, setSelectedColor] = useState("white")
  const [selectedSize, setSelectedSize] = useState("")
  const [designText, setDesignText] = useState("")
  const [fontSize, setFontSize] = useState("medium")
  const [textColor, setTextColor] = useState("black")

  const tshirtColors = [
    { name: "White", value: "white", hex: "#FFFFFF" },
    { name: "Black", value: "black", hex: "#000000" },
    { name: "Navy", value: "navy", hex: "#1E3A8A" },
    { name: "Gray", value: "gray", hex: "#6B7280" },
    { name: "Red", value: "red", hex: "#DC2626" },
    { name: "Blue", value: "blue", hex: "#2563EB" },
  ]

  const sizes = ["S", "M", "L", "XL", "XXL"]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Design Your Custom T-Shirt</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create your unique design using our easy-to-use design tool. Add text, upload images, or choose from our
            templates.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Design Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
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
                    <div className="w-48 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center">
                      {designText ? (
                        <div
                          className={`text-center font-bold ${
                            fontSize === "small" ? "text-sm" : fontSize === "medium" ? "text-lg" : "text-2xl"
                          }`}
                          style={{ color: textColor }}
                        >
                          {designText}
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm">Your design will appear here</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>T-Shirt Color</Label>
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
                  <Label htmlFor="size">Size</Label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
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
                    <span className="text-lg font-semibold">Total: $34.99</span>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Save Design
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
                <CardTitle>Design Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="text" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="text">
                      <Type className="h-4 w-4 mr-2" />
                      Text
                    </TabsTrigger>
                    <TabsTrigger value="image">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Image
                    </TabsTrigger>
                    <TabsTrigger value="templates">
                      <Palette className="h-4 w-4 mr-2" />
                      Templates
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="text" className="space-y-4 mt-6">
                    <div>
                      <Label htmlFor="design-text">Text</Label>
                      <Textarea
                        id="design-text"
                        placeholder="Enter your text here..."
                        value={designText}
                        onChange={(e) => setDesignText(e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Font Size</Label>
                        <Select value={fontSize} onValueChange={setFontSize}>
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Text Color</Label>
                        <Select value={textColor} onValueChange={setTextColor}>
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="black">Black</SelectItem>
                            <SelectItem value="white">White</SelectItem>
                            <SelectItem value="red">Red</SelectItem>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="green">Green</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="image" className="space-y-4 mt-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-2">Upload your image</p>
                      <p className="text-sm text-gray-500 mb-4">PNG, JPG up to 10MB</p>
                      <Button variant="outline">Choose File</Button>
                    </div>

                    <div>
                      <Label>Image Position</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="top">Top</SelectItem>
                          <SelectItem value="bottom">Bottom</SelectItem>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="templates" className="space-y-4 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((template) => (
                        <div
                          key={template}
                          className="aspect-square bg-gray-100 rounded-lg border-2 border-gray-200 hover:border-purple-600 cursor-pointer flex items-center justify-center"
                        >
                          <span className="text-gray-500">Template {template}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Design Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Design Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Use high-resolution images (300 DPI minimum)</li>
                  <li>• Keep text readable with good contrast</li>
                  <li>• Consider the t-shirt color when choosing design colors</li>
                  <li>• Simple designs often work best</li>
                  <li>• Preview your design before ordering</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
