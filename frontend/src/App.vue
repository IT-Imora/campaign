<script setup lang="ts">
import { RouterView, useRouter, useRoute } from 'vue-router'
import { ref, watch, computed, onMounted } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
import ConfirmDialog from 'primevue/confirmdialog'
import ScrollTop from 'primevue/scrolltop'
import { useCampaignStore } from '@/stores/campaignStore'

const isLoading = ref(false)
const router = useRouter()
const route = useRoute()
const campaignStore = useCampaignStore()

const DEFAULT_TITLE = 'Campaign | Honda Jakarta Center'

// Map severity ke warna
const severityColors = {
  primary: '#1976d2',     // Blue
  secondary: '#424242',   // Dark Gray
  success: '#2e7d32',     // Green
  info: '#0288d1',        // Light Blue
  warning: '#ed6c02',     // Orange
  danger: '#d32f2f'       // Red
}

// Computed property untuk mendapatkan warna berdasarkan severity
const primaryColor = computed(() => {
  if (campaignStore.campaign?.severity) {
    return severityColors[campaignStore.campaign.severity] || severityColors.primary
  }
  return severityColors.primary
})

// Function untuk mengatur CSS variable
const setCSSVariable = () => {
  document.documentElement.style.setProperty('--color-primary', primaryColor.value)
}

// Watch perubahan campaign untuk update CSS variable
watch(() => campaignStore.campaign?.severity, () => {
  setCSSVariable()
}, { immediate: true })

// Set initial CSS variable saat component mounted
onMounted(() => {
  setCSSVariable()
})

const updateTitle = () => {
  document.title = (route.meta.title as string) || DEFAULT_TITLE
}

/**
 * Update title setiap route berubah
 */
watch(
  () => route.meta.title,
  () => {
    updateTitle()
  },
  { immediate: true }
)

/**
 * Loading state
 */
router.beforeEach(() => {
  isLoading.value = true
})

router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})
</script>

<template>
  <RouterView />

  <div class="fixed inset-0 z-20 flex items-center justify-center bg-blue-900/10 backdrop-blur-sm text-white 
    text-lg font-semibold!" v-if="isLoading">
    <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="4" animationDuration=".8s" />
  </div>

  <!-- Dialog Confirm  -->
  <ConfirmDialog group="confirm" :style="{ maxWidth: '90vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex flex-col gap-10 items-center px-4 lg:px-8 py-10 bg-white rounded-xl">
        <span class="font-semibold! text-lg block mb-2 mt-6 text-center">
          {{ message.message }}
        </span>
        <button class="btn btn-primary shadow-lg w-1/3 rounded-4xl!" @click="acceptCallback">
          OK
        </button>
      </div>
    </template>
  </ConfirmDialog>

  <ScrollTop />

</template>

<style scoped>
.p-scrolltop.p-button {
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  bottom: 4rem;
  opacity: 0.8;
  background-color: var(--color-primary);
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
