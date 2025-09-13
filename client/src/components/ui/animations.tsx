import { motion } from "framer-motion";

// Common animation variants for glassmorphism design

// Fade in animation with slight upward movement
export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.6,
    ease: "easeOut",
  },
};

// Fade in animation with slight downward movement
export const fadeInDown = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.6,
    ease: "easeOut",
  },
};

// Fade in from left
export const fadeInLeft = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  transition: {
    duration: 0.6,
    ease: "easeOut",
  },
};

// Fade in from right
export const fadeInRight = {
  initial: {
    opacity: 0,
    x: 20,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  transition: {
    duration: 0.6,
    ease: "easeOut",
  },
};

// Scale in animation
export const scaleIn = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    duration: 0.5,
    ease: "easeOut",
  },
};

// Stagger animation for lists (children appear one by one)
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Stagger item (used with staggerContainer)
export const staggerItem = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.6,
    ease: "easeOut",
  },
};

// Hover scale effect for cards
export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: 0.2,
    ease: "easeOut",
  },
};

// Predefined motion components
export const MotionDiv = motion.div;
export const MotionSection = motion.section;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionH3 = motion.h3;
export const MotionP = motion.p;

// Animation presets
export const animations = {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  staggerItem,
  hoverScale,
};
