<script setup lang="ts">
import Header from '../Header.vue'
import Body from '../Body.vue';

import { useRoute, useRouter } from 'vue-router'
import { useCouponStore } from '@/stores/couponStore';
import { useCampaignStore } from '@/stores/campaignStore';
import { formatDate } from '@/utils/date';

const couponStore = useCouponStore()
const campaignStore = useCampaignStore()
const route = useRoute()
const slug = route.params.slug as string
</script>

<template>

    <Body :severity="campaignStore.campaign?.severity">
        <template #header>
            <Header backIcon="arrow-left" :severity="campaignStore.campaign?.severity" position="sticky">
                <template #heading>
                    Kupon Kamu
                </template>
            </Header>
        </template>
        <template #body>
            <div class="rounded-t-3xl relative bg-white text-black min-h-[calc(100vh-4rem)] 
                flex flex-col justify-between">
                <div class="pt-4 px-6 md:px-12 lg:px-20 flex justify-between border-b border-slate-300 pb-4">
                    <div class="flex flex-col">
                        <small class="text-slate-600">Kamu memiliki :</small>
                        <div class="flex items-center gap-2">
                            <span class="pi pi-ticket"></span>
                            <span class="font-bold!" :class="`text-${campaignStore.campaign?.severity || 'primary'}`">
                                {{ couponStore.count }} Kupon
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex-1 overflow-auto p-4 md:px-12 lg:px-20 space-y-4">
                    <div v-if="couponStore.count === 0" class="text-center text-slate-600 mt-10">
                        Kamu belum memiliki kupon. Yuk ikutan campaign untuk mendapatkan kupon!
                    </div>
                    <div v-else class="space-y-4!">
                        <!-- <Message severity="info" icon="pi pi-info-circle">
                            Kupon bisa diperoleh dengan membeli mobil Honda dan melakukan service berkala di bengkel
                            resmi Honda.
                        </Message> -->
                        <div v-for="coupon in couponStore.coupons" :key="coupon.tanggal_referensi"
                            class="border border-slate-300 rounded-md p-4 shadow-sm bg-slate-50">
                            <div class="flex flex-col gap-2">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-lg font-bold! mb-0"
                                        :class="`text-${campaignStore.campaign?.severity || 'primary'}`">
                                        Kupon Baru
                                    </h3>
                                    <small class="text-xs text-slate-600"> + {{ coupon.count }} Kupon</small>
                                </div>
                                <div class="text-sm text-slate-500 -mt-2!">
                                    {{ formatDate(coupon.tanggal_referensi, "DD MMM YYYY") }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Body>
</template>