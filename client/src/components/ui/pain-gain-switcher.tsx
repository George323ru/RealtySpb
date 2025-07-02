import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from './card'
import { Button } from './button'
import * as Icons from 'lucide-react'

interface PainGainItem {
  text: string
}

interface PainGain {
  painTitle: string
  gainTitle: string
  pains: PainGainItem[]
  gains: PainGainItem[]
}

interface PainGainSwitcherProps {
  painGain: PainGain
  className?: string
}

export const PainGainSwitcher = ({ painGain, className }: PainGainSwitcherProps) => {
  const [showGain, setShowGain] = useState(false)

  return (
    <div className={`relative flex flex-col items-center ${className || ''}`}>
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {!showGain ? (
            <motion.div
              key="pain"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-destructive/50 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-destructive">
                    <Icons.XCircle /> {painGain.painTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {painGain.pains.map((pain, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Icons.ShieldAlert className="mt-1 h-5 w-5 flex-shrink-0 text-destructive/80" />
                      <span>{pain.text}</span>
                    </div>
                  ))}
                  <Button className="mt-6" variant="outline" onClick={() => setShowGain(true)}>
                    Увидеть решение →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="gain"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <Icons.CheckCircle2 /> {painGain.gainTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {painGain.gains.map((gain, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Icons.Star className="mt-1 h-5 w-5 flex-shrink-0 text-primary/80" />
                      <span>{gain.text}</span>
                    </div>
                  ))}
                  <Button className="mt-6" variant="default" onClick={() => setShowGain(false)}>
                    ← Вернуться к проблемам
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 