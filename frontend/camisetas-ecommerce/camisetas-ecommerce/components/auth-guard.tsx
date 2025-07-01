"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { Card, CardContent } from "@/components/ui/card"
import { Shirt } from "lucide-react"

interface AuthGuardProps {
    children: React.ReactNode
    redirectTo?: string
}

export default function AuthGuard({ children, redirectTo = "/auth/login" }: AuthGuardProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthed, setIsAuthed] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = isAuthenticated()
            setIsAuthed(authenticated)
            setIsLoading(false)

            if (!authenticated) {
                router.push(redirectTo)
            }
        }

        // Small delay to prevent flash
        const timer = setTimeout(checkAuth, 100)
        return () => clearTimeout(timer)
    }, [router, redirectTo])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardContent className="flex flex-col items-center justify-center p-8">
                        <div className="animate-spin mb-4">
                            <Shirt className="h-8 w-8 text-purple-600" />
                        </div>
                        <p className="text-gray-600">Loading...</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!isAuthed) {
        return null // Will redirect
    }

    return <>{children}</>
}
