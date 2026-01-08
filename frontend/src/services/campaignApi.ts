import api from './api'
import type { Campaign } from '@/types/campaign'

export const campaignApi = {
  active() {
    return api.get<Campaign>(
      `after_sales/active_campaign`
    )
  },
  show(slug: string) {
    return api.get<Campaign>(
      `after_sales/campaign/${slug}`
    )
  },
}