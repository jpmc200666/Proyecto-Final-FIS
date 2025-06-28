"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, ShoppingCart, User, Heart, Menu, Shirt, Palette } from "lucide-react"

export default function Navigation() {
  const [cartCount] = useState(2)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Shirt className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">TeeShop</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/products" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    All Products
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <div className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-500 to-blue-600 p-6 no-underline outline-none focus:shadow-md"
                          href="/custom-design"
                        >
                          <Palette className="h-6 w-6 text-white" />
                          <div className="mb-2 mt-4 text-lg font-medium text-white">Custom Design</div>
                          <p className="text-sm leading-tight text-white/90">
                            Create your own unique t-shirt design with our easy-to-use tools.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                    <div className="grid gap-1">
                      <Link
                        href="/products?category=vintage"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100"
                      >
                        <div className="text-sm font-medium leading-none">Vintage</div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                          Classic and retro-inspired designs
                        </p>
                      </Link>
                      <Link
                        href="/products?category=minimalist"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100"
                      >
                        <div className="text-sm font-medium leading-none">Minimalist</div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-600">Clean and simple designs</p>
                      </Link>
                      <Link
                        href="/products?category=artistic"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100"
                      >
                        <div className="text-sm font-medium leading-none">Artistic</div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-600">Creative and abstract artwork</p>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/custom-design" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Design Tool
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search products..." className="pl-10 pr-4" />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Account */}
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="/products" className="text-lg font-medium">
                    All Products
                  </Link>
                  <Link href="/custom-design" className="text-lg font-medium">
                    Design Tool
                  </Link>
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">Categories</h3>
                    <div className="space-y-2 ml-4">
                      <Link href="/products?category=vintage" className="block text-gray-600">
                        Vintage
                      </Link>
                      <Link href="/products?category=minimalist" className="block text-gray-600">
                        Minimalist
                      </Link>
                      <Link href="/products?category=artistic" className="block text-gray-600">
                        Artistic
                      </Link>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">Account</h3>
                    <div className="space-y-2 ml-4">
                      <Link href="/auth/login" className="block text-gray-600">
                        Sign In
                      </Link>
                      <Link href="/auth/register" className="block text-gray-600">
                        Create Account
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
