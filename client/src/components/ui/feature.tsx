import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureProps {
  /**
   * Icon to display above the title
   */
  icon: LucideIcon;
  /**
   * Feature title
   */
  title: string;
  /**
   * Feature description
   */
  description: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Animation delay for staggered animations
   */
  delay?: number;
  /**
   * Custom icon size
   */
  iconSize?: number;
}

const Feature = React.forwardRef<HTMLDivElement, FeatureProps>(
  ({ icon: Icon, title, description, className, delay = 0, iconSize = 24, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "flex flex-col items-center text-center",
          "p-6 glass",
          "rounded-2xl",
          "group hover:shadow-lg",
          "transition-all duration-300",
          className
        )}
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
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
        {/* Icon with background */}
        <div className="mb-4 p-3 bg-card/50 rounded-full group-hover:bg-card/70 transition-colors">
          <Icon size={iconSize} className="text-card-foreground" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-card-foreground mb-2 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </motion.div>
    );
  }
);

Feature.displayName = "Feature";

export { Feature, type FeatureProps };
