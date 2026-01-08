<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    backIcon?: string
    backUrl?: string,
    severity?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'transparent'
}>()

</script>
<template>
    <div class="body" :class="`bg-${props.severity || 'primary'}`">
        <slot name="header"></slot>
        <div class="mx-auto sm:px-14">
            <slot name="body"></slot>
        </div>
    </div>
</template>