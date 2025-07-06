import { Card, CardContent } from './card'
import { Badge } from './badge'
import { Gift } from 'lucide-react'
import { motion } from 'framer-motion'

export const UrgencyBanner = ({ className }: { className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    className={className}
  >
    <Card className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 text-white shadow-xl border-0">
      <CardContent className="flex items-center gap-4 py-4 px-6">
        <Gift className="w-10 h-10 flex-shrink-0 drop-shadow-lg" />
        <div>
          <Badge className="bg-white/20 text-white border-white/30 mb-1">Акция</Badge>
          <div className="font-bold text-lg leading-tight">
            Только до конца месяца: закажите монтаж отопления и получите <span className="underline">умный термостат Nest</span> в подарок <span className="text-xs">(стоимостью 15 000 руб.)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
) 