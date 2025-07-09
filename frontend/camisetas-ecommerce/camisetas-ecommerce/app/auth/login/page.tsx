"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, Shirt, AlertCircle } from "lucide-react"
import {setAuthToken, setUserData, isAuthenticated, type User, getAuthToken} from "@/lib/auth"
import { setCarritoActivo, type Carrito } from "@/lib/products"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/profile")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.message || "An error occurred. Please try again.")
        return
      }
      const data = await response.json()
      // Mostrar los roles en consola
      console.log(data)
      console.log("Roles del usuario:", data.roles)
      // Extraer el primer rol del array roles
      const userRole = Array.isArray(data.roles) && data.roles.length > 0 ? data.roles[0] : undefined

      // Mock successful login
      const mockToken = data.token
      const mockUser: User = {
        id: "1",
        firstName: data.nombre,
        lastName: "Doe",
        email: data.email,
        phone: "+1 (555) 123-4567",
        avatar: "/placeholder.svg?height=100&width=100",
        joinDate: "2023-01-15",
        role: userRole,
        address: {
          street: "123 Main St",
          city: "Springfield",
          state: "IL",
          zipCode: "62704",
          country: "USA",
        },
        stats: {
          totalOrders: 5,
          totalSpent: 299.99,
          wishlistItems: 3,
          loyaltyPoints: 120,
        },
        orders: [],
        wishlist: [],
      }

      // Store auth data
      console.log(mockUser)
      setAuthToken(mockToken)
      setUserData(mockUser)

      // Obtener el carrito activo del cliente (idCliente=2 como ejemplo)
      try {
        const token = getAuthToken()
        const carritoRes = await fetch("http://localhost:8080/carrito/active-by-cliente?idCliente=2", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        if (carritoRes.ok) {
          const carritoData: Carrito = await carritoRes.json()
          // Asegura que elementosCarrito siempre sea un array aunque venga vacío o undefined
          if (!Array.isArray(carritoData.elementosCarrito)) {
            carritoData.elementosCarrito = []
          }
          console.log(carritoData.elementosCarrito, carritoData)
          setCarritoActivo(carritoData)
          console.log("Carrito activo guardado:", carritoData)
        } else {
          console.warn("No se pudo obtener el carrito activo")
          // Si la respuesta no es ok, limpia el carrito activo
          setCarritoActivo({
            id: 0,
            fechaCreacion: null,
            vigencia: 0,
            totalCarrito: 0,
            elementosCarrito: [],
          })
        }
      } catch (carritoErr) {
        console.error("Error al obtener el carrito activo:", carritoErr)
        setCarritoActivo({
          id: 0,
          fechaCreacion: null,
          vigencia: 0,
          totalCarrito: 0,
          elementosCarrito: [],
        })
      }

      // Redirect to profile
      router.push("/profile")

    } catch (err) {
      setError("An error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

    // Render the login form
  return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2">
              <Shirt className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">Estampate!</span>
            </Link>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Bienvenido de nuevo</CardTitle>
              <CardDescription className="text-center">Inicia sesión en tu cuenta para continuar comprando</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="Introduce tu correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                        disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Introduce tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                        disabled={isLoading}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>



                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
              </form>
            </CardContent>

            <CardFooter>
              <div className="text-center text-sm text-gray-600 w-full">
                ¿No tienes una cuenta?{" "}
                <Link href="/auth/register" className="text-purple-600 hover:underline font-medium">
                  Regístrate
                </Link>
              </div>
            </CardFooter>
          </Card>

          <div className="text-center mt-6 text-xs text-gray-500">
            Al iniciar sesión, aceptas nuestros{" "}
            <Link href="/terms" className="hover:underline">
              Términos de servicio
            </Link>{" "}
            y{" "}
            <Link href="/privacy" className="hover:underline">
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
  )
}
