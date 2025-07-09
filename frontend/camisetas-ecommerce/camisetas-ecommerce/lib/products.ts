// Nueva interfaz para las imágenes de estampas
export interface Imagen {
    id: number
    url: string
    descripcion: string
}

// Base interfaces
export interface Print {
    id: number
    nombre: string
    descripcion: string
    precioBase: number
    rating: number
    tema: string
    fechaPublicacion: string
    estado: boolean
    imagenes: Imagen[]
    catalogo: any | null
}


export interface TshirtStock {
    id: number
    capacidad: number
    fechaUltimaActualizacion: string
    proveedores: any[]
    hibernateLazyInitializer?: object
}

export interface TshirtModel {
    id: number
    color: string
    talla: string
    material: string
    precio: number
    urlImagen: string
    stock: TshirtStock
}

// Design tool specific interfaces
export interface DesignState {
    selectedTshirt: TshirtModel
    selectedPrint: Print | null
    selectedColor: string
    selectedSize: string
    designText: string
    fontSize: "small" | "medium" | "large"
    textColor: string
}

export interface TshirtColor {
    name: string
    value: string
    hex: string
}

// Component props interfaces
export interface SlideMenuProps<T> {
    items: T[]
    onSelect: (item: T) => void
    selectedItem?: T | null
    type: "prints" | "tshirts"
    searchable?: boolean
    className?: string
}

// Filter and sort types
export type SortOption = "featured" | "price-low" | "price-high" | "rating" | "popular"
export type FilterCategory = "all" | string

// Search and filter interfaces
export interface FilterState {
    searchTerm: string
    sortBy: SortOption
    filterCategory: FilterCategory
}

// Interfaces para el carrito
export interface ElementoCarrito {
    id: number
    cantidad: number
    camisetaEstampada: {
        id: number
        precioCamiseta: number
        estampasAplicadas: any
    } | null
}

export interface Carrito {
    id: number
    fechaCreacion: string | null
    vigencia: number
    totalCarrito: number
    elementosCarrito: ElementoCarrito[]
}

// Helpers para guardar y obtener el carrito en localStorage
const CARRITO_KEY = "carrito_activo"

export const setCarritoActivo = (carrito: Carrito) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito))
    }
}

export const getCarritoActivo = (): Carrito | null => {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem(CARRITO_KEY)
        if (!data) return null
        return JSON.parse(data)
    }
    return null
}
