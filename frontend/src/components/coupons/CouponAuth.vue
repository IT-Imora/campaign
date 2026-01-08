<script setup lang="ts">
import Header from '../Header.vue'
import Body from '../Body.vue';

import { computed, reactive, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useCampaignStore } from '@/stores/campaignStore'
import { useCouponStore } from '@/stores/couponStore';

import { publicStorage } from '@/utils/storage';

const formData = reactive({
    no_rangka: null as string | null,
    no_telepon: null as number | null,
});

const disabledForm = computed(() => {
    return !formData.no_rangka || !formData.no_telepon;
});

const router = useRouter()
const couponStore = useCouponStore()
const route = useRoute()
const slug = route.params.slug as string
const campaignStore = useCampaignStore()
const submitForm = () => {
    couponStore.check(formData.no_rangka || '', formData.no_telepon || 0).then(() => {
        // Form submitted successfully
        router.push(`/${slug}/my-coupons/`)
    }).catch(() => {
        // Handle error if needed
    });
    // Here you can add your form submission logic, e.g., API call
};

const showTerm = ref(false);

const openTerm = () => {
    showTerm.value = true;
};

onMounted(() => {
    campaignStore.fetch(slug)
})
</script>

<template>

    <Body :severity="campaignStore.campaign?.severity">
        <template #header>
            <Header backIcon="arrow-left" :severity="campaignStore.campaign?.severity || 'primary'" position="sticky">
                <template #heading>
                    Cek Kupon Kamu
                </template>
            </Header>
        </template>
        <template #body>
            <div class="rounded-t-3xl relative bg-no-repeat bg-cover bg-top min-h-[calc(100vh-4rem)] flex flex-col 
            sm:flex-row justify-between sm:bg-none!"
                :style="{ backgroundImage: 'url(' + publicStorage(campaignStore.campaign?.banner_form || '') + ')' }">

                <div class="absolute inset-0 bg-cover bg-top bg-no-repeat hidden sm:block"
                    :style="{ backgroundImage: 'url(' + publicStorage(campaignStore.campaign?.banner || '') + ')' }">
                </div>

                <div class="sm:w-1/2 lg:w-2/3">
                    <div class=" pt-4 px-6 sm:px-12 lg:px-20 flex justify-end sm:justify-between">
                        <button @click="openTerm()" class="py-2 px-3 rounded-full text-white text-sm font-bold flex items-center 
                            gap-2 w-24 justify-between drop-shadow-2xl cursor-pointer"
                            :class="`bg-${campaignStore.campaign?.severity || 'primary'}`">
                            <span class="flex items-center gap-2">
                                <span class="pi pi-info-circle"></span>
                                Info
                            </span>
                            <span class="pi pi-chevron-right text-xs"></span>
                        </button>
                    </div>
                </div>

                <div class="sm:w-1/2 lg:w-1/3 flex items-center justify-center h-full pt-4 pb-10 px-6 sm:px-12 lg:px-20 
                    rounded-t-2xl sm:rounded-t-none shadow-2xl relative bg-white/40 backdrop-blur-sm
                    sm:h-[calc(100vh-4rem)]" :class="`text-${campaignStore.campaign?.severity || 'primary'}`">
                    <form @submit.prevent="submitForm" class="flex flex-col gap-4">
                        <h3 class="text-center font-bold!">
                            Masukkan data kamu untuk memeriksa kupon
                        </h3>
                        <FloatLabel variant="on">
                            <InputText id="formData.no_rangka" v-model="formData.no_rangka" fluid />
                            <label for="formData.no_rangka">Nomor Rangka</label>
                        </FloatLabel>
                        <InputGroup>
                            <InputGroupAddon>+62</InputGroupAddon>
                            <FloatLabel variant="on">
                                <InputNumber id="formData.no_telepon" v-model="formData.no_telepon" :useGrouping="false"
                                    fluid />
                                <label for="formData.no_telepon">Nomor Telepon</label>
                            </FloatLabel>
                        </InputGroup>

                        <Button type="submit" :severity="campaignStore.campaign?.severity || 'info'"
                            label="Periksa Kupon" fluid :disabled="disabledForm" :loading="couponStore.loading" />
                        <small class="text-muted text-center">
                            Pastikan data yang kamu masukkan sudah benar.
                        </small>
                    </form>
                </div>
            </div>
        </template>
    </Body>

    <Dialog header="Syarat dan Ketentuan" v-model:visible="showTerm" modal :style="{ maxWidth: '90vw' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" closable>
        <div class="prose max-w-none wrap-break-word whitespace-normal" v-html="campaignStore.campaign?.description" />
    </Dialog>
</template>