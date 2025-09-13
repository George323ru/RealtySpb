import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Intensity of the glass effect
   * @default "normal"
   */
  intensity?: "normal" | "strong"
  /**
   * Whether to apply rounded corners
   * @default true
   */
  rounded?: boolean
  /**
   * Additional custom classes
   */
  className?: string
  /**
   * Children content
   */
  children: React.ReactNode
}

const Glass = React.forwardRef<HTMLDivElement, GlassProps>(
  ({ className, intensity = "normal", rounded = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base glass effect
          intensity === "strong" ? "glass-strong" : "glass",
          // Remove rounded corners if specified
          !rounded && "rounded-none",
          // Custom classes
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Glass.displayName = "Glass"

export { Glass, type GlassProps }
