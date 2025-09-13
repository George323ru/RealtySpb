import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from './card'

interface Step {
  id: string
  title: string
  description: string
}

interface ProcessTimelineProps {
  steps: Step[]
  title?: string
  subtitle?: string
  className?: string
}

export const ProcessTimeline = ({ steps, title, subtitle, className }: ProcessTimelineProps) => {
  return (
    <section className={`relative py-24 ${className || ''}`}>
      <div className="container mx-auto px-4">
        {title && (
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
            {subtitle && <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}
          </div>
        )}
        <div className="relative mt-20 flex flex-col items-center">
          {/* Вертикальная линия timeline */}
          <motion.div
            className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-primary/30"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ originY: 0 }}
          />
          <div className="relative w-full max-w-2xl">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className={`relative mb-16 flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Точка на линии */}
                <div className="absolute left-1/2 top-0 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground shadow-lg">
                  {step.id}
                </div>
                {/* Карточка этапа */}
                <div className={`w-[calc(50%-2.5rem)] ${index % 2 === 0 ? 'ml-16 text-left' : 'mr-16 text-right'}`}>
                  <Card className="inline-block w-full">
                    <CardHeader>
                      <CardTitle>{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 