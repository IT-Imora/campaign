<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useCampaignStore } from '@/stores/campaignStore'
import { publicStorage } from '@/utils/storage'

const route = useRoute()
const slug = route.params.slug as string
const campaignStore = useCampaignStore()
</script>

<template>
    <div>
        <!-- Mobile -->
        <Image imageClass="w-full block sm:hidden"
            :src="publicStorage(campaignStore.campaign?.banner_portrait || campaignStore.campaign?.banner || '')" />

        <!-- Desktop / Tablet -->
        <Image imageClass="w-full hidden sm:block"
            :src="publicStorage(campaignStore.campaign?.banner || campaignStore.campaign?.banner_portrait || '')" />
    </div>
    <div class="p-4 sm:p-6 lg:p-8">
        <h2 class="text-lg text-center sm:text-3xl lg:text-4xl font-bold!">
            {{ campaignStore.campaign?.text || "Cara ikut nya gampang banget!" }}
        </h2>
    </div>
    <div>
        <!-- Mobile -->
        <Image imageClass="w-full block sm:hidden"
            :src="publicStorage(campaignStore.campaign?.image_portrait || campaignStore.campaign?.image || '')" />

        <!-- Desktop / Tablet -->
        <Image imageClass="w-full hidden sm:block"
            :src="publicStorage(campaignStore.campaign?.image || campaignStore.campaign?.image_portrait || '')" />
    </div>
    <div class="bg-white text-black pb-20 pt-5">
        <!-- <h2 class="text-center font-bold!">Syarat dan Ketentuan</h2> -->
        <div class="px-2 sm:px-6 lg:px-8 pt-2 overflow-hidden">
            <article class="prose max-w-none ql-editor" v-html="campaignStore.campaign?.description" />
        </div>
    </div>
    <div
        class="fixed bottom-0 left-0 w-full flex items-center justify-center bg-white/50 backdrop-blur-sm shadow-t-md py-2 px-4">
        <RouterLink :to="`/${slug}/coupons/`" class="text-xl uppercase font-semibold!">
            <button class="btn w-full uppercase" :class="`btn-${campaignStore.campaign?.severity || 'primary'}`">
                Cek Kupon Undian
            </button>
        </RouterLink>
    </div>
</template>