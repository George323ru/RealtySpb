import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { PanInfo } from 'framer-motion'

interface BeforeAfterSliderProps {
  before: string
  after: string
  alt?: string
  className?: string
}

export const BeforeAfterSlider = ({ before, after, alt, className }: BeforeAfterSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [percent, setPercent] = useState(50)
  const dragging = useRef(false)

  const handleDrag = (_: any, info: PanInfo) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    let x = info.point.x - rect.left
    x = Math.max(0, Math.min(x, rect.width))
    setPercent(Math.round((x / rect.width) * 100))
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-64 rounded-lg overflow-hidden shadow-lg group ${className || ''}`}
      onMouseMove={e => dragging.current && dragging.current}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchMove={e => dragging.current && dragging.current}
      onTouchEnd={() => (dragging.current = false)}
    >
      <img src={before} alt={alt || 'До'} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <motion.img
        src={after}
        alt={alt || 'После'}
        className="absolute inset-0 h-full object-cover"
        style={{ width: percent + '%' }}
        draggable={false}
        initial={{ width: '0%' }}
        animate={{ width: percent + '%' }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      />
      {/* Divider/Handle */}
      <motion.div
        className="absolute top-0 bottom-0"
        style={{ left: `calc(${percent}% - 16px)` }}
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0}
        onDragStart={() => (dragging.current = true)}
        onDragEnd={() => (dragging.current = false)}
        onDrag={handleDrag}
        tabIndex={0}
        role="slider"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="w-8 h-full flex items-center justify-center cursor-ew-resize">
          <div className="w-1 h-24 bg-primary rounded-full shadow-lg" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-xl border-2 border-white">
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M7 10h6M10 7l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </motion.div>
      {/* Labels */}
      <div className="absolute left-4 top-4 bg-black/60 text-white text-xs px-2 py-1 rounded">До</div>
      <div className="absolute right-4 top-4 bg-black/60 text-white text-xs px-2 py-1 rounded">После</div>
    </div>
  )
}

export default BeforeAfterSlider 