<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

import { useConfirm } from "primevue/useconfirm";
import { useCampaignStore } from '@/stores/campaignStore'

import { publicStorage } from '@/utils/storage';

const props = defineProps<{
    backIcon?: string
    backUrl?: string,
    severity?: 'none' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'transparent' | 'transparent-blur'
    position?: 'sticky' | 'fixed'
}>()

const router = useRouter()
const confirm = useConfirm();
const route = useRoute()
const slug = route.params.slug as string
const campaignStore = useCampaignStore()

const isExternal = computed(() => {
    return props.backUrl?.startsWith('http')
})

const showBack = computed(() => !!props.backIcon || !!props.backUrl)

function goBack() {
    if (!props.backUrl) {
        router.back()
        return
    }

    if (isExternal.value) {
        window.location.href = props.backUrl
    } else {
        router.push(props.backUrl)
    }
}


const shareTo = async () => {
    try {
        const webUrl = `https://campaign.hondajakartacenter.com/${slug}`

        const shareText =
            `Ayo ikutan ${campaignStore.campaign?.name || 'campaign'}! ` +
            `Dapatkan kesempatan memenangkan hadiah menarik dari Honda Jakarta Center.\n\n` +
            `Cek detailnya di ${webUrl}`

        if (!navigator.share) {
            confirm.require({
                group: 'confirm',
                message: 'Fitur share tidak didukung di browser ini',
            })
            return
        }

        await navigator.share({
            title: campaignStore.campaign?.name || 'Campaign',
            text: shareText,
            url: webUrl,
        })

        confirm.require({
            group: 'confirm',
            message: 'Campaign berhasil dibagikan',
        })
    } catch (error: any) {
        confirm.require({
            group: 'confirm',
            message: error?.message || 'Gagal membagikan campaign',
        })
    }
}

</script>

<template>
    <nav class="h-16 navbar px-0 sm:px-14" :class="[
        `navbar-${props.severity || 'primary'}`,
        props.position ? `navbar-${props.position}` : ''
    ]">
        <div class="navbar-brand flex items-center gap-2">
            <button v-if="showBack" class="cursor-pointer rounded-md px-2" @click="goBack">
                <i v-if="backIcon" :class="`pi pi-${backIcon.toLowerCase()}`" />
                <i v-else class="pi pi-arrow-left" />
            </button>

            <slot name="heading">Header</slot>
        </div>

        <div class="navbar-end">
            <slot name="end" />
            <button class="rounded-full w-9 h-9 flex items-center justify-center cursor-pointer" @click="shareTo">
                <i class="pi pi-share-alt"></i>
            </button>
        </div>
    </nav>
</template>
