import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FloatingBadgeProps {
  /**
   * Icon to display in the badge
   */
  icon: LucideIcon;
  /**
   * Badge text content
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Animation delay in seconds
   */
  delay?: number;
  /**
   * Custom icon size
   */
  iconSize?: number;
}

const FloatingBadge = React.forwardRef<HTMLDivElement, FloatingBadgeProps>(
  ({ icon: Icon, children, className, delay = 0, iconSize = 16, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2",
          "glass text-card-foreground",
          "rounded-full border",
          "backdrop-blur-sm",
          "shadow-lg",
          className
        )}
        initial={{
          opacity: 0,
          y: -10,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
          delay,
          ease: "easeOut",
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 },
        }}
        {...props}
      >
        <Icon size={iconSize} className="text-card-foreground" />
        <span className="text-sm font-medium">{children}</span>
      </motion.div>
    );
  }
);

FloatingBadge.displayName = "FloatingBadge";

export { FloatingBadge, type FloatingBadgeProps };
