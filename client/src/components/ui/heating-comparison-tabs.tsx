import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs'
import { Card, CardHeader, CardTitle, CardContent } from './card'
import { Flame, Thermometer, Footprints, Home } from 'lucide-react'

const comparison = {
  floor: {
    title: 'Теплый пол',
    icon: <Footprints className="inline-block mr-2 text-primary" />,
    pros: [
      'Равномерное распределение тепла по всей площади',
      'Максимальный комфорт для ног',
      'Идеально для плитки и ламината',
      'Меньше циркуляция пыли',
      'Экономия на отоплении до 20-30% при правильной автоматике',
    ],
    cons: [
      'Дороже в установке, чем радиаторы',
      'Не рекомендуется для некоторых напольных покрытий (ковролин, паркет)',
      'Медленнее реагирует на изменение температуры',
    ],
    verdict: 'Рекомендуем для новых домов, где можно заложить систему на этапе ремонта. Идеально для санузлов, кухни, гостиных. Для спален и детских — по желанию.',
  },
  radiators: {
    title: 'Радиаторы',
    icon: <Thermometer className="inline-block mr-2 text-primary" />,
    pros: [
      'Быстрый нагрев помещения',
      'Дешевле и проще в установке',
      'Можно реализовать в любом доме, даже без капитального ремонта',
      'Легко регулировать температуру в каждой комнате',
    ],
    cons: [
      'Менее равномерное распределение тепла',
      'Могут пересушивать воздух',
      'Могут мешать расстановке мебели',
    ],
    verdict: 'Оптимально для вторичного жилья, квартир, где нет возможности делать стяжку. Хорошо сочетается с современными терморегуляторами.',
  },
}

export const HeatingComparisonTabs = ({ className }: { className?: string }) => (
  <Card className={`w-full max-w-2xl mx-auto my-8 ${className || ''}`}>
    <CardHeader>
      <CardTitle>Что лучше для вашего дома?</CardTitle>
    </CardHeader>
    <CardContent>
      <Tabs defaultValue="floor" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="floor">{comparison.floor.icon}Теплый пол</TabsTrigger>
          <TabsTrigger value="radiators">{comparison.radiators.icon}Радиаторы</TabsTrigger>
        </TabsList>
        <TabsContent value="floor">
          <div className="mb-2 font-semibold text-primary">Преимущества:</div>
          <ul className="mb-2 list-disc pl-5 text-sm">
            {comparison.floor.pros.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
          <div className="mb-2 font-semibold text-destructive">Ограничения:</div>
          <ul className="mb-2 list-disc pl-5 text-sm">
            {comparison.floor.cons.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
          <div className="mt-4 text-muted-foreground text-sm">{comparison.floor.verdict}</div>
        </TabsContent>
        <TabsContent value="radiators">
          <div className="mb-2 font-semibold text-primary">Преимущества:</div>
          <ul className="mb-2 list-disc pl-5 text-sm">
            {comparison.radiators.pros.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
          <div className="mb-2 font-semibold text-destructive">Ограничения:</div>
          <ul className="mb-2 list-disc pl-5 text-sm">
            {comparison.radiators.cons.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
          <div className="mt-4 text-muted-foreground text-sm">{comparison.radiators.verdict}</div>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
) 