import { MapPin } from 'lucide-react'

export const DistrictsMap = ({ districts, className }: { districts: string[], className?: string }) => (
  <section className={`py-16 bg-gradient-to-br from-blue-50 to-blue-100 ${className || ''}`}>
    <div className="container mx-auto px-4">
      <div className="flex items-center mb-8">
        <MapPin className="w-8 h-8 mr-3 text-primary" />
        <h2 className="text-3xl font-bold text-text-primary">Работаем во всех районах Санкт-Петербурга и области</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {districts.map((d, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-3 text-center text-sm font-medium text-blue-900 border border-blue-100">
            {d}
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default DistrictsMap 