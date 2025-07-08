"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import AuthGuard from "@/components/auth-guard"
import { getUserData, logout, getRoleInfo,type User } from "@/lib/auth"
import {
    UserIcon,
    Package,
    Settings,
    Heart,
    MapPin,
    Phone,
    Mail,
    Calendar,
    Edit,
    Eye,
    Download,
    Truck,
    CheckCircle,
    Clock,
    AlertCircle,
    Camera,
    LogOut,
} from "lucide-react"


export default function ProfilePage() {
    return (
        <AuthGuard>
            <ProfileContent />
        </AuthGuard>
    )
}

function ProfileContent() {
    const [isEditing, setIsEditing] = useState(false)
    const [profileData, setProfileData] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")

    useEffect(() => {
        const userData = getUserData()
        console.log(userData)
        if (userData) {
            setProfileData(userData)
        }
    }, [])

    const getStatusColor = (status: string) => {
        switch (status) {
            case "delivered":
                return "bg-green-100 text-green-800"
            case "shipped":
                return "bg-blue-100 text-blue-800"
            case "processing":
                return "bg-yellow-100 text-yellow-800"
            case "cancelled":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "delivered":
                return <CheckCircle className="h-4 w-4" />
            case "shipped":
                return <Truck className="h-4 w-4" />
            case "processing":
                return <Clock className="h-4 w-4" />
            case "cancelled":
                return <AlertCircle className="h-4 w-4" />
            default:
                return <Clock className="h-4 w-4" />
        }
    }

    const handleSaveProfile = async () => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsEditing(false)
        setIsLoading(false)
        setSuccessMessage("Profile updated successfully!")
        setTimeout(() => setSuccessMessage(""), 3000)
    }

    const handleInputChange = (field: string, value: string) => {
        if (profileData) {
            setProfileData((prev) => ({
                ...prev!,
                [field]: value,
            }))
        }
    }

    const handleAddressChange = (field: string, value: string) => {
        if (profileData) {
            setProfileData((prev) => ({
                ...prev!,
                address: {
                    ...(prev as any).address,
                    [field]: value,
                },
            }))
        }
    }

    const handleLogout = () => {
        logout()
    }

    if (!profileData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin mb-4">
                        <UserIcon className="h-8 w-8 text-purple-600 mx-auto" />
                    </div>
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        )
    }

    const stats = {
        totalOrders: Array.isArray(profileData.orders) ? profileData.orders.length : 0,
        totalSpent: Array.isArray(profileData.orders)
            ? profileData.orders.reduce((sum, order) => sum + order.total, 0)
            : 0,
        wishlistItems: Array.isArray(profileData.wishlist) ? profileData.wishlist.length : 0,
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Mi Perfil</h1>
                        <p className="text-gray-600">Administra la configuración de tu cuenta y revisa tu historial de pedidos</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 bg-transparent">
                        <LogOut className="h-4 w-4" />
                        Cerrar sesión
                    </Button>
                </div>

                {successMessage && (
                    <Alert className="mb-6 border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
                    </Alert>
                )}

                <div className="grid lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1">
                        <Card>
                            <CardContent className="p-6">
                                <div className="text-center mb-6">
                                    <div className="relative inline-block">
                                        <Avatar className="h-24 w-24 mx-auto">
                                            <AvatarImage
                                                src={profileData.avatar || "/placeholder.svg"}
                                                alt={`${profileData.firstName} ${profileData.lastName}`}
                                            />
                                            <AvatarFallback className="text-lg">
                                                {(profileData.firstName?.[0] || "")}
                                                {(profileData.lastName?.[0] || "")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                                        >
                                            <Camera className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <h3 className="font-semibold text-lg mt-4">
                                        {profileData.firstName}
                                    </h3>
                                    <p className="text-gray-600 text-sm">{profileData.email}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Miembro desde {new Date(profileData.joinDate).toLocaleDateString()}
                                    </p>
                                    <div className="mt-2">
                                        <Badge className={`text-xs ${getRoleInfo(profileData.role).color}`}>
                                            {getRoleInfo(profileData.role).label}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div>
                                            <div className="text-2xl font-bold text-purple-600">{stats.totalOrders}</div>
                                            <div className="text-xs text-gray-600">Pedidos</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-green-600">${stats.totalSpent.toFixed(2)}</div>
                                            <div className="text-xs text-gray-600">Gastado</div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div>
                                            <div className="text-2xl font-bold text-red-600">{stats.wishlistItems}</div>
                                            <div className="text-xs text-gray-600">Favoritos</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-3">
                        <Tabs defaultValue="profile" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="profile" className="flex items-center gap-2">
                                    <UserIcon className="h-4 w-4" />
                                    Perfil
                                </TabsTrigger>
                                <TabsTrigger value="orders" className="flex items-center gap-2">
                                    <Package className="h-4 w-4" />
                                    Pedidos
                                </TabsTrigger>
                                <TabsTrigger value="wishlist" className="flex items-center gap-2">
                                    <Heart className="h-4 w-4" />
                                    Favoritos
                                </TabsTrigger>
                                <TabsTrigger value="settings" className="flex items-center gap-2">
                                    <Settings className="h-4 w-4" />
                                    Configuración
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="profile">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle>Información Personal</CardTitle>
                                            <CardDescription>Actualiza tus datos personales y de contacto</CardDescription>
                                        </div>
                                        <Button
                                            variant={isEditing ? "default" : "outline"}
                                            onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                "Guardando..."
                                            ) : isEditing ? (
                                                "Guardar Cambios"
                                            ) : (
                                                <>
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Editar
                                                </>
                                            )}
                                        </Button>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">Nombre</Label>
                                                <Input
                                                    id="firstName"
                                                    value={profileData.firstName}
                                                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            {/* Apellido eliminado */}
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Correo electrónico</Label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={profileData.email}
                                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                                        disabled={!isEditing}
                                                        className="pl-10"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Teléfono</Label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                                    <Input
                                                        id="phone"
                                                        value={profileData.phone || ""}
                                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                                        disabled={!isEditing}
                                                        className="pl-10"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Rol de la cuenta</Label>
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <Badge className={getRoleInfo(profileData.role).color}>
                                                    {getRoleInfo(profileData.role).label}
                                                </Badge>
                                                <div>
                                                    <p className="text-sm text-gray-600">{getRoleInfo(profileData.role).description}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div>
                                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                                <MapPin className="h-5 w-5" />
                                                Dirección de envío
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="street">Dirección</Label>
                                                    <Input
                                                        id="street"
                                                        value={(profileData as any).address?.street || ""}
                                                        onChange={(e) => handleAddressChange("street", e.target.value)}
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="city">Ciudad</Label>
                                                        <Input
                                                            id="city"
                                                            value={(profileData as any).address?.city || ""}
                                                            onChange={(e) => handleAddressChange("city", e.target.value)}
                                                            disabled={!isEditing}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="state">Departamento/Estado</Label>
                                                        <Input
                                                            id="state"
                                                            value={(profileData as any).address?.state || ""}
                                                            onChange={(e) => handleAddressChange("state", e.target.value)}
                                                            disabled={!isEditing}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="zipCode">Código Postal</Label>
                                                        <Input
                                                            id="zipCode"
                                                            value={(profileData as any).address?.zipCode || ""}
                                                            onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                                                            disabled={!isEditing}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="country">País</Label>
                                                        <Input
                                                            id="country"
                                                            value={(profileData as any).address?.country || ""}
                                                            onChange={(e) => handleAddressChange("country", e.target.value)}
                                                            disabled={!isEditing}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="orders">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Historial de Pedidos</CardTitle>
                                        <CardDescription>Consulta y rastrea tus pedidos recientes</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-6">
                                            {profileData.orders?.map((order: any) => (
                                                <div key={order.id} className="border rounded-lg p-4">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="flex items-center gap-4">
                                                            <div>
                                                                <h3 className="font-semibold">Pedido {order.id}</h3>
                                                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                                                    <Calendar className="h-4 w-4" />
                                                                    {new Date(order.date).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                            <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                                                                {getStatusIcon(order.status)}
                                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                            </Badge>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="font-semibold">${order.total.toFixed(2)}</div>
                                                            <div className="flex gap-2 mt-2">
                                                                <Button size="sm" variant="outline">
                                                                    <Eye className="h-4 w-4 mr-1" />
                                                                    Ver
                                                                </Button>
                                                                {order.status === "delivered" && (
                                                                    <Button size="sm" variant="outline">
                                                                        <Download className="h-4 w-4 mr-1" />
                                                                        Factura
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        {order.items.map((item: any) => (
                                                            <div key={item.id} className="flex items-center gap-4">
                                                                <img
                                                                    src={item.image || "/placeholder.svg"}
                                                                    alt={item.name}
                                                                    className="w-16 h-16 object-cover rounded-lg"
                                                                />
                                                                <div className="flex-1">
                                                                    <h4 className="font-medium">{item.name}</h4>
                                                                    <p className="text-sm text-gray-600">
                                                                        Talla: {item.size} | Color: {item.color} | Cantidad: {item.quantity}
                                                                    </p>
                                                                </div>
                                                                <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="wishlist">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Mis Favoritos</CardTitle>
                                        <CardDescription>Productos que has guardado para después</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {profileData.wishlist?.map((item: any) => (
                                                <div key={item.id} className="border rounded-lg p-4">
                                                    <img
                                                        src={item.image || "/placeholder.svg"}
                                                        alt={item.name}
                                                        className="w-full h-32 object-cover rounded-lg mb-3"
                                                    />
                                                    <h3 className="font-semibold mb-2">{item.name}</h3>
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="font-bold">${item.price}</span>
                                                        <Badge variant={item.inStock ? "default" : "secondary"}>
                                                            {item.inStock ? "Disponible" : "Agotado"}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" className="flex-1" disabled={!item.inStock}>
                                                            Añadir al carrito
                                                        </Button>
                                                        <Button size="sm" variant="outline">
                                                            Quitar
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="settings">
                                <div className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Configuración de la Cuenta</CardTitle>
                                            <CardDescription>Administra tus preferencias y seguridad</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium">Notificaciones por correo</h3>
                                                    <p className="text-sm text-gray-600">Recibe actualizaciones sobre tus pedidos y promociones</p>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    Configurar
                                                </Button>
                                            </div>
                                            <Separator />
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium">Cambiar contraseña</h3>
                                                    <p className="text-sm text-gray-600">Actualiza la contraseña de tu cuenta</p>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    Cambiar
                                                </Button>
                                            </div>
                                            <Separator />
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium">Autenticación en dos pasos</h3>
                                                    <p className="text-sm text-gray-600">Agrega una capa extra de seguridad a tu cuenta</p>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    Activar
                                                </Button>
                                            </div>
                                            <Separator />
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium text-red-600">Cerrar sesión</h3>
                                                    <p className="text-sm text-gray-600">Cierra tu sesión de la cuenta</p>
                                                </div>
                                                <Button variant="destructive" size="sm" onClick={handleLogout}>
                                                    <LogOut className="h-4 w-4 mr-2" />
                                                    Cerrar sesión
                                                </Button>
                                            </div>
                                            <Separator />
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium text-red-600">Eliminar cuenta</h3>
                                                    <p className="text-sm text-gray-600">Elimina tu cuenta y todos tus datos permanentemente</p>
                                                </div>
                                                <Button variant="destructive" size="sm">
                                                    Eliminar
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}
