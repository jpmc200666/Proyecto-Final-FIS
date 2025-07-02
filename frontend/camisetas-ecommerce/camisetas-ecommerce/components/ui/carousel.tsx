"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CarouselProps {
    children: React.ReactNode
    className?: string
}

interface CarouselContentProps {
    children: React.ReactNode
    className?: string
}

interface CarouselItemProps {
    children: React.ReactNode
    className?: string
}

const CarouselContext = React.createContext<{
    currentIndex: number
    setCurrentIndex: (index: number) => void
    itemsCount: number
    setItemsCount: (count: number) => void
} | null>(null)

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(({ children, className, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [itemsCount, setItemsCount] = React.useState(0)

    return (
        <CarouselContext.Provider value={{ currentIndex, setCurrentIndex, itemsCount, setItemsCount }}>
            <div ref={ref} className={cn("relative", className)} {...props}>
                {children}
            </div>
        </CarouselContext.Provider>
    )
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
    ({ children, className, ...props }, ref) => {
        const context = React.useContext(CarouselContext)
        const childrenArray = React.Children.toArray(children)

        React.useEffect(() => {
            if (context) {
                context.setItemsCount(childrenArray.length)
            }
        }, [childrenArray.length, context])

        return (
            <div className="overflow-hidden" ref={ref} {...props}>
                <div
                    className={cn("flex transition-transform duration-300 ease-in-out", className)}
                    style={{
                        transform: `translateX(-${(context?.currentIndex || 0) * 100}%)`,
                    }}
                >
                    {children}
                </div>
            </div>
        )
    },
)
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(({ children, className, ...props }, ref) => {
    return (
        <div ref={ref} className={cn("min-w-0 shrink-0 grow-0 basis-full", className)} {...props}>
            {children}
        </div>
    )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
    ({ className, variant = "outline", size = "icon", ...props }, ref) => {
        const context = React.useContext(CarouselContext)

        const handlePrevious = () => {
            if (context) {
                const newIndex = context.currentIndex > 0 ? context.currentIndex - 1 : context.itemsCount - 1
                context.setCurrentIndex(newIndex)
            }
        }

        return (
            <Button
                ref={ref}
                variant={variant}
                size={size}
                className={cn(
                    "absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/80 hover:bg-white",
                    className,
                )}
                onClick={handlePrevious}
                {...props}
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous slide</span>
            </Button>
        )
    },
)
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
    ({ className, variant = "outline", size = "icon", ...props }, ref) => {
        const context = React.useContext(CarouselContext)

        const handleNext = () => {
            if (context) {
                const newIndex = context.currentIndex < context.itemsCount - 1 ? context.currentIndex + 1 : 0
                context.setCurrentIndex(newIndex)
            }
        }

        return (
            <Button
                ref={ref}
                variant={variant}
                size={size}
                className={cn(
                    "absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/80 hover:bg-white",
                    className,
                )}
                onClick={handleNext}
                {...props}
            >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next slide</span>
            </Button>
        )
    },
)
CarouselNext.displayName = "CarouselNext"

const CarouselIndicators = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const context = React.useContext(CarouselContext)

        if (!context || context.itemsCount <= 1) return null

        return (
            <div ref={ref} className={cn("absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1", className)} {...props}>
                {Array.from({ length: context.itemsCount }).map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                            "h-2 w-2 rounded-full transition-colors",
                            index === context.currentIndex ? "bg-white" : "bg-white/50",
                        )}
                        onClick={() => context.setCurrentIndex(index)}
                    />
                ))}
            </div>
        )
    },
)
CarouselIndicators.displayName = "CarouselIndicators"

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselIndicators }
