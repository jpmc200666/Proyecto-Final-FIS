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
