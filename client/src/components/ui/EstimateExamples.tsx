import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './card'
import { Badge } from './badge'
import { Button } from './button'
import OptimizedImage from '../OptimizedImage'
import type { EstimateExample } from '@shared/types'

interface EstimateExamplesProps {
  examples: EstimateExample[]
  className?: string
}

export const EstimateExamples = ({ examples, className }: EstimateExamplesProps) => (
  <section className={`py-16 bg-neutral-100 ${className || ''}`}>
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-10 text-center">Примеры реальных смет</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {examples.map((ex, i) => (
          <Card key={i} className="flex flex-col overflow-hidden">
            {ex.image && (
              <OptimizedImage src={ex.image} alt={ex.type} className="w-full h-40 object-cover" />
            )}
            <CardHeader>
              <CardTitle className="text-xl mb-2">{ex.type}</CardTitle>
              <Badge className="text-lg px-3 py-1 bg-primary/10 text-primary border-primary/20 mb-2">{ex.price}</Badge>
              <div className="text-sm text-muted-foreground mb-2">Срок: {ex.duration}</div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="list-disc pl-5 space-y-1">
                {ex.works.map((work, idx) => (
                  <li key={idx}>{work}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm">
                Запросить такую смету
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  </section>
) 