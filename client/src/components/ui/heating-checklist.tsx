import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './card'
import { Button } from './button'
import { Checkbox } from './checkbox'
import { motion, AnimatePresence } from 'framer-motion'

const QUESTIONS = [
  'У вас есть проект отопления с расчетом теплопотерь?',
  'Вам предложили оборудование с официальной гарантией в РФ?',
  'В смете учтена погодозависимая автоматика для экономии?',
  'Монтажники, которые приедут, являются штатными сотрудниками?',
]

const getResult = (checkedCount: number) => {
  if (checkedCount < 3) {
    return {
      title: 'Похоже, в вашем предложении есть "слепые зоны"',
      text: 'Давайте мы бесплатно проведем аудит вашей сметы и покажем, где можно сэкономить без потери качества.',
      cta: 'Получить аудит сметы',
    }
  }
  return {
    title: 'Отличная подготовка! Вы на правильном пути',
    text: 'Давайте обсудим детали, чтобы довести ваш проект до идеала.',
    cta: 'Обсудить детали',
  }
}

export const HeatingChecklist = ({ className }: { className?: string }) => {
  const [checked, setChecked] = useState<boolean[]>(Array(QUESTIONS.length).fill(false))
  const checkedCount = checked.filter(Boolean).length
  const result = getResult(checkedCount)

  const handleCheck = (i: number) => {
    setChecked(arr => arr.map((v, idx) => (idx === i ? !v : v)))
  }

  return (
    <Card className={`w-full max-w-xl mx-auto my-8 ${className || ''}`}>
      <CardHeader>
        <CardTitle>Чек-лист идеальной системы отопления</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {QUESTIONS.map((q, i) => (
            <motion.label
              key={i}
              className="flex items-center gap-3 cursor-pointer"
              initial={false}
              animate={{ scale: checked[i] ? 1.04 : 1, opacity: checked[i] ? 1 : 0.85 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Checkbox checked={checked[i]} onCheckedChange={() => handleCheck(i)} />
              <span className={checked[i] ? 'font-semibold text-primary' : ''}>{q}</span>
            </motion.label>
          ))}
          <AnimatePresence mode="wait">
            {checkedCount > 0 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="mt-6 rounded-lg bg-primary/10 p-4 text-center"
              >
                <div className="text-lg font-bold mb-2">{result.title}</div>
                <div className="mb-4 text-muted-foreground">{result.text}</div>
                <Button size="lg" className="w-full max-w-xs mx-auto">
                  {result.cta}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
} 