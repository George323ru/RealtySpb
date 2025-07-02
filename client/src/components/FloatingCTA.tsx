import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { Button } from './ui/button'

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const halfWindow = window.innerHeight * 0.5
      setIsVisible(scrollY > halfWindow)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed bottom-4 right-4 z-50 hidden md:block"
    >
      <Button asChild size="lg" className="shadow-2xl">
        <a href="#lead-form">
          Получить расчет
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </Button>
    </motion.div>
  )
}

export default FloatingCTA
