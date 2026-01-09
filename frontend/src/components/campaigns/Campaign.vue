<script setup lang="ts">
import Header from '../Header.vue'
import CampaignItem from './CampaignItem.vue'

import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCampaignStore } from '@/stores/campaignStore'
import { publicStorage } from '@/utils/storage';
import ProgressSpinner from 'primevue/progressspinner'

import Body from '../Body.vue'

const router = useRouter()
const route = useRoute()
const slug = route.params.slug as string
const campaignStore = useCampaignStore()

const loading = ref(false)
const message = ref(`Download data ${slug}`)

const delay = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms))

onMounted(async () => {
    if (campaignStore.firstLoad) {
        loading.value = true
        // Delay statis agar spinner & pesan tampil dulu
        await delay(2000)

        message.value = 'Memeriksa data...'
        await delay(1500)
    }

    let campaign = campaignStore.campaign

    if (campaign) {
        message.value = 'Menyiapkan data...'
    } else {
        if (!slug) {
            campaign = await campaignStore.active()
        }

        message.value = 'Tidak ada campaign saat ini.'
    }

    await delay(1000)

    loading.value = false
    if (!campaign) {
        router.replace({ name: 'not-found' })
    }
})
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center gap-4" v-if="loading">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="4" animationDuration=".8s" />
        <span class="text-lg font-medium px-5 text-center">
            {{ message }}
        </span>
    </div>

    <Body :severity="campaignStore.campaign?.severity" v-else>
        <template #header>
            <Header class="w-full" severity="transparent-blur" position="sticky">
                <template #heading>
                    <img :src="publicStorage(campaignStore.campaign?.logo || '')" alt="Campaign Logo"
                        class="h-8 sm:h-12" />
                </template>
            </Header>
        </template>
        <template #body>
            <CampaignItem />
        </template>
    </Body>
</template>
