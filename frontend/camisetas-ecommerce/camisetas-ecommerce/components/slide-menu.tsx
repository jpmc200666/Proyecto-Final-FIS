"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Search, Star, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Print, TshirtModel, SlideMenuProps } from "@/lib/products"

export default function SlideMenu<T extends Print | TshirtModel>({
                                                                     items,
                                                                     onSelect,
                                                                     selectedItem,
                                                                     type,
                                                                     searchable = false,
                                                                     className,
                                                                 }: SlideMenuProps<T>) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const itemsPerView = 3

    const filteredItems = searchable
        ? items.filter((item) => {
            const searchLower = searchTerm.toLowerCase()
            if (type === "prints") {
                const printItem = item as Print
                return (
                    printItem.nombre.toLowerCase().includes(searchLower) ||
                    printItem.descripcion.toLowerCase().includes(searchLower) ||
                    printItem.tema.toLowerCase().includes(searchLower)
                )
            } else {
                const tshirtItem = item as TshirtModel
                return (
                    tshirtItem.color.toLowerCase().includes(searchLower) ||
                    tshirtItem.talla.toLowerCase().includes(searchLower) ||
                    tshirtItem.material.toLowerCase().includes(searchLower)
                )
            }
        })
        : items

    const maxIndex = Math.max(0, filteredItems.length - itemsPerView)

    const scrollToIndex = (index: number) => {
        const newIndex = Math.max(0, Math.min(index, maxIndex))
        setCurrentIndex(newIndex)

        if (scrollContainerRef.current) {
            const itemWidth = scrollContainerRef.current.scrollWidth / filteredItems.length
            scrollContainerRef.current.scrollTo({
                left: newIndex * itemWidth,
                behavior: "smooth",
            })
        }
    }

    const handlePrevious = () => {
        scrollToIndex(currentIndex - 1)
    }

    const handleNext = () => {
        scrollToIndex(currentIndex + 1)
    }

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

    if (filteredItems.length === 0) {
        return (
            <div className={cn("text-center py-8", className)}>
                <p className="text-gray-500">
                    {searchTerm ? `No ${type} found matching "${searchTerm}"` : `No ${type} available`}
                </p>
            </div>
        )
    }

    return (
        <div className={cn("space-y-4", className)}>
            {searchable && (
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder={`Search ${type}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            )}

            <div className="relative">
                {/* Navigation Buttons */}
                {currentIndex > 0 && (
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-md"
                        onClick={handlePrevious}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                )}

                {currentIndex < maxIndex && (
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-md"
                        onClick={handleNext}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                )}

                {/* Items Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className={cn(
                                "flex-shrink-0 w-48 cursor-pointer",
                                selectedItem?.id === item.id && "ring-2 ring-purple-500 ring-offset-2",
                            )}
                            onClick={() => onSelect(item)}
                        >
                            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                                <div className="relative">
                                    {/* Imagen */}
                                    {type === "prints" ? (
                                        <img
                                            src={(item as Print).imagenes?.[0]?.url || "/placeholder.svg"}
                                            alt={(item as Print).nombre}
                                            className="w-full h-32 object-cover rounded-t-lg"
                                        />
                                    ) : (
                                        <img
                                            src={(item as TshirtModel).urlImagen || "/placeholder.svg"}
                                            alt={(item as TshirtModel).color}
                                            className="w-full h-32 object-cover rounded-t-lg"
                                        />
                                    )}
                                    {/* Botón favorito solo para prints */}
                                    {type === "prints" && (
                                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 hover:opacity-100 transition-opacity">
                                            <Button size="sm" className="h-6 w-6 rounded-full p-0" onClick={(e) => e.stopPropagation()}>
                                                <Heart className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    )}
                                    {selectedItem?.id === item.id && (
                                        <div className="absolute inset-0 bg-purple-500/20 rounded-t-lg flex items-center justify-center">
                                            <div className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-medium">Selected</div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-3">
                                    <h4 className="font-medium text-sm mb-1 truncate">
                                        {type === "prints"
                                            ? (item as Print).nombre
                                            : (item as TshirtModel).color + " - " + (item as TshirtModel).talla}
                                    </h4>

                                    {type === "prints"
                                        ? (() => {
                                            const printItem = item as Print
                                            return (
                                                <>
                                                    <p className="text-xs text-gray-600 mb-2">{printItem.tema}</p>
                                                    <div className="flex items-center gap-1 mb-2">
                                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-xs text-gray-600">{printItem.rating}</span>
                                                    </div>
                                                    <div className="text-sm font-bold text-purple-600">${printItem.precioBase}</div>
                                                </>
                                            )
                                        })()
                                        : (() => {
                                            const tshirtItem = item as TshirtModel
                                            return (
                                                <>
                                                    <p className="text-xs text-gray-600 mb-2">{tshirtItem.material}</p>
                                                    {/* No hay rating ni colores en TshirtModel según products.ts */}
                                                    <div className="text-sm font-bold">${tshirtItem.precio}</div>
                                                </>
                                            )
                                        })()}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Indicators */}
                {filteredItems.length > itemsPerView && (
                    <div className="flex justify-center gap-1 mt-4">
                        {Array.from({ length: Math.ceil(filteredItems.length / itemsPerView) }).map((_, index) => (
                            <button
                                key={index}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-colors",
                                    Math.floor(currentIndex / itemsPerView) === index ? "bg-purple-500" : "bg-gray-300",
                                )}
                                onClick={() => scrollToIndex(index * itemsPerView)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
