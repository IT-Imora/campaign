import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Coupon } from '@/types/coupon'
import { couponApi } from '@/services/couponApi'
import type { AxiosError } from 'axios'
import { useConfirm } from 'primevue'

export const useCouponStore = defineStore('coupons', () => {
    const coupons = ref<Coupon[]>([])
    const count = ref(0)
    const loading = ref(false)
    const error = ref<string | null>(null)
    const confirm = useConfirm()

    async function check(no_rangka: string, no_telepon: number) {
        loading.value = true
        error.value = null
        try {
            const res = await couponApi.check(no_rangka, no_telepon)
            coupons.value = res.data.summary
            count.value = res.data.count
        } catch (err) {
            const axiosError = err as AxiosError<{ message?: string }>
            error.value =
                axiosError.response?.data?.message ??
                axiosError.message ??
                'Failed to check coupon.'

            confirm.require({
                group: 'confirm',
                message: error.value,
            })
        } finally {
            loading.value = false
        }
    }

    function reset() {
        coupons.value = []
        count.value = 0
        error.value = null
    }
    return {
        coupons,
        count,
        loading,
        error,
        check,
        reset,
    }
})