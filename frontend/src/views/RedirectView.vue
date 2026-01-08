<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCampaignStore } from '@/stores/campaignStore'
import ProgressSpinner from 'primevue/progressspinner'

const router = useRouter()
const campaignStore = useCampaignStore()

const message = ref('Mencari campaign aktif...')

const delay = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms))

onMounted(async () => {
    // Delay statis agar spinner & pesan tampil dulu
    await delay(2000)

    message.value = 'Memeriksa data campaign...'
    await delay(1500)

    let campaign = campaignStore.campaign

    if (!campaign) {
        campaign = await campaignStore.active()
    }

    if (campaign) {
        message.value = 'Menyiapkan campaign...'
    } else {
        message.value = 'Tidak ada campaign saat ini.'
    }

    await delay(1000)

    if (campaign) {
        router.replace({
            name: 'campaign',
            params: { slug: campaign.slug },
        })
    } else {
        router.replace({ name: 'not-found' })
    }
})
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center gap-4">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="4" animationDuration=".8s" />
        <span class="text-lg font-medium">
            {{ message }}
        </span>
    </div>
</template>
