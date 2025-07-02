import { useState } from 'react'
import { Slider } from './slider'
import { Card, CardHeader, CardTitle, CardContent } from './card'

const MIN_AREA = 50
const MAX_AREA = 400
const DEFAULT_AREA = 120
const PRICE_PER_M2 = 850 // руб/м²/год (примерная средняя стоимость отопления)
const ECONOMY_PERCENT = 0.4

export const HeatingEconomyCalculator = ({ className }: { className?: string }) => {
  const [area, setArea] = useState(DEFAULT_AREA)
  const baseCost = area * PRICE_PER_M2
  const economy = Math.round(baseCost * ECONOMY_PERCENT)

  return (
    <Card className={`w-full max-w-xl mx-auto my-8 ${className || ''}`}>
      <CardHeader>
        <CardTitle>Рассчитайте вашу экономию</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Площадь дома:</span>
            <span className="font-semibold text-lg">{area} м²</span>
          </div>
          <Slider
            min={MIN_AREA}
            max={MAX_AREA}
            step={10}
            value={[area]}
            onValueChange={([v]) => setArea(v)}
            className="my-2"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-muted-foreground">Ваша экономия в год:</span>
            <span className="text-2xl font-bold text-primary">~{economy.toLocaleString()} ₽</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            *Расчет основан на средней стоимости отопления {PRICE_PER_M2} ₽/м²/год и экономии до 40% при установке современной системы с автоматикой.
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 