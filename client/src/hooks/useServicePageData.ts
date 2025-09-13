import { useQuery } from '@tanstack/react-query'
import { getHeatingServiceData } from '../api/heatingServiceData'
import { engineeringSystemsData } from '../api/engineeringData'
import { ServiceDetailData } from '../../../packages/shared/src/types'

// Тип для инженерных систем
interface ServicePageData {
  directions: Array<{ icon: string; title: string; slug: string; description: string; cta: string }>
  howItWorksSteps: Array<{ id: string; title: string; description: string }>
  advantages: Array<{ icon: string; title: string; description: string }>
  faqItems: Array<{ icon: string; question: string; answer: string }>
  reviews: Array<{ author: string; text: string }>
}

const fetchEngineeringSystemsData = async (): Promise<ServicePageData> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return engineeringSystemsData
}

const fetchServiceData = async (serviceId: string): Promise<ServiceDetailData | ServicePageData> => {
  switch (serviceId) {
    case 'heating':
      return getHeatingServiceData()
    case 'engineering-systems':
      return fetchEngineeringSystemsData()
    // Здесь можно добавить другие сервисы по мере необходимости
    default:
      throw new Error('Неизвестный serviceId: ' + serviceId)
  }
}

export const useServicePageData = (serviceId: string) => {
  return useQuery<ServiceDetailData | ServicePageData>({
    queryKey: ['serviceDetail', serviceId],
    queryFn: () => fetchServiceData(serviceId),
    enabled: !!serviceId,
  })
} 