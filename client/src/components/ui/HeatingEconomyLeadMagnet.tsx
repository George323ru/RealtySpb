import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './card'
import { Input } from './input'
import { Button } from './button'
import { motion } from 'framer-motion'

export const HeatingEconomyLeadMagnet = ({ className }: { className?: string }) => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Введите корректный email')
      return
    }
    setError('')
    setSubmitted(true)
    // TODO: интеграция с LeadForm или API
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <Card className="w-full max-w-xl mx-auto my-8">
        <CardHeader>
          <CardTitle>Получите детальный PDF-расчет на Email</CardTitle>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center text-green-600 font-semibold py-6">
              Спасибо! Ваш расчет отправлен на {email}.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <p className="text-muted-foreground text-sm mb-2">
                Мы вышлем вам подробный расчет экономии и 3 варианта сметы для вашей площади. Никакого спама!
              </p>
              <Input
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="max-w-xs"
              />
              {error && <div className="text-red-500 text-xs">{error}</div>}
              <Button type="submit" className="w-full mt-2">
                Получить PDF-расчет
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
} 