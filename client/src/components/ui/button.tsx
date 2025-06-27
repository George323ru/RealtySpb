import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 min-h-[48px] min-w-[48px] cursor-pointer transition-all duration-300 ease-in-out",
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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
