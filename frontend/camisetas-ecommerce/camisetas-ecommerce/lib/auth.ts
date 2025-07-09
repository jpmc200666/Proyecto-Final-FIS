"use client"

// Auth utility functions
export const AUTH_TOKEN_KEY = "tshirt_auth_token"
export const USER_DATA_KEY = "tshirt_user_data"

export interface Address {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
}

export interface Stats {
    totalOrders: number
    totalSpent: number
    wishlistItems: number
    loyaltyPoints: number
}

export interface Order {
    id: string
    date: string
    status: string
    total: number
    items: any[]
}

export interface WishlistItem {
    id: number
    name: string
    price: number
    image: string
    inStock: boolean
}

export interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    phone?: string
    avatar?: string
    joinDate: string
    role: "usuario" | "artista" | "administrador"
    address: Address
    stats: Stats
    orders?: Order[]
    wishlist?: WishlistItem[]
}

export const setAuthToken = (token: string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(AUTH_TOKEN_KEY, token)
    }
}

export const getAuthToken = (): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(AUTH_TOKEN_KEY)
    }
    return null
}

export const removeAuthToken = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(AUTH_TOKEN_KEY)
        localStorage.removeItem(USER_DATA_KEY)
    }
}

export const setUserData = (user: User) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(user))
    }
}

export const getUserData = (): User | null => {
    if (typeof window !== "undefined") {
        const userData = localStorage.getItem(USER_DATA_KEY)
        if (!userData) return null
        const user = JSON.parse(userData)
        // Asegura que orders y wishlist siempre sean arrays
        if (!user.orders) user.orders = []
        if (!user.wishlist) user.wishlist = []
        return user
    }
    return null
}

export const isAuthenticated = (): boolean => {
    return !!getAuthToken()
}

export const logout = () => {
    removeAuthToken()
    if (typeof window !== "undefined") {
        window.location.href = "/auth/login"
    }
}
export const getRoleInfo = (role: User["role"]) => {
    switch (role) {
        case "administrador":
            return {
                label: "Administrador",
                color: "bg-red-100 text-red-800",
                description: "Full system access and management",
            }
        case "artista":
            return {
                label: "Artista",
                color: "bg-purple-100 text-purple-800",
                description: "Puede crear y vender camisetas",
            }
        case "usuario":
        default:
            return {
                label: "Cliente",
                color: "bg-blue-100 text-blue-800",
                description: "Puede comprar y personalizar camisetas",
            }
    }
}
