import { defineStore } from 'pinia'
import { ref } from 'vue'
import { campaignApi } from '@/services/campaignApi'
import type { Campaign } from '@/types/campaign'
import type { AxiosError } from 'axios'

export const useCampaignStore = defineStore('campaign', () => {
  const campaign = ref<Campaign | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const firstLoad = ref(true)

  async function fetch(slug: string) {
    loading.value = true
    error.value = null

    try {
      reset()

      const res = await campaignApi.show(slug)
      campaign.value = res.data
      firstLoad.value = false

      return res.data
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>
      error.value =
        axiosError.response?.data?.message ??
        axiosError.message ??
        'Failed to fetch landing page data.'

      return null
    } finally {
      loading.value = false
    }
  }

  async function active() {
    loading.value = true
    error.value = null

    try {
      reset()

      const res = await campaignApi.active()
      campaign.value = res.data
      firstLoad.value = false
      
      return res.data
    }
    catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>
      error.value =
        axiosError.response?.data?.message ??
        axiosError.message ??
        'Failed to fetch active campaign data.'

      return null
    }
    finally {
      loading.value = false
    }
  }

  function reset() {
    campaign.value = null
    error.value = null
  }

  return {
    campaign,
    loading,
    error,
    fetch,
    active,
    reset,
    firstLoad,
  }
})
