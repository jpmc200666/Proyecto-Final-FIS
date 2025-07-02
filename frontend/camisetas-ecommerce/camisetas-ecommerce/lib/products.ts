// Base interfaces
export interface Print {
    id: number
    name: string
    artist: string
    category: string
    image: string
    rating: number
    downloads: number
    price: number
    tags: string[]
}

export interface TshirtModel {
    id: number
    name: string
    material: string
    image: string
    colors: string[]
    sizes: string[]
    price: number
    rating: number
    reviews: number
    category: string
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
