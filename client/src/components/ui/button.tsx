import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Check } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 min-h-[48px] min-w-[48px] cursor-pointer transition-all duration-300 ease-in-out relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "btn-primary",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-[var(--transition-normal)]",
        outline: "btn-outline",
        secondary: "btn-secondary", 
        ghost: `
          bg-gradient-to-t from-orange-100/80 to-orange-100/80 
          bg-no-repeat bg-bottom [background-size:100%_0%] 
          hover:[background-size:100%_100%] hover:text-accent-orange
          text-base font-medium
        `,
        link: "text-primary underline-offset-4 hover:underline min-h-auto min-w-auto rounded-none",
      },
      size: {
        default: "h-12 px-6 py-3 text-base font-semibold rounded-xl",
        sm: "h-10 px-4 py-2 text-sm font-medium rounded-lg",
        lg: "h-14 px-8 py-4 text-lg font-semibold rounded-xl", 
        icon: "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Ripple компонент для волнового эффекта
const Ripple = ({ x, y }: { x: number; y: number }) => (
  <motion.span
    className="absolute bg-white/30 rounded-full pointer-events-none"
    style={{
      left: x - 10,
      top: y - 10,
      width: 20,
      height: 20,
    }}
    initial={{ scale: 0, opacity: 1 }}
    animate={{ scale: 4, opacity: 0 }}
    exit={{ scale: 6, opacity: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  />
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  success?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    loading = false,
    success = false,
    children,
    disabled,
    ...props 
  }, ref) => {
    
    // Определяем что показывать в кнопке
    const getButtonContent = () => {
      if (loading) {
        return (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Загрузка...</span>
          </>
        )
      }
      
      if (success) {
        return (
          <>
            <Check className="h-4 w-4" />
            <span>Готово!</span>
          </>
        )
      }
      
      return children
    }

    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || disabled}
        {...props}
      >
        {getButtonContent()}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
