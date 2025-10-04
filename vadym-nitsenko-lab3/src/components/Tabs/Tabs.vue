<script setup>
import { ref, provide, watch } from 'vue'

const props = defineProps({
  defaultTab: { type: [String, Number], default: null },
  variant: { type: String, default: 'underline' }
})

const activeTab = ref(props.defaultTab)

function setActive(id) {
  activeTab.value = id
}

watch(() => props.defaultTab, v => { activeTab.value = v })

provide('tabs', {
  activeTab,
  setActive,
  variant: props.variant
})
</script>

<template>
  <div>
    <slot name="tabs"></slot>
    <slot name="panels"></slot>
  </div>
</template>

<style scoped>
</style>
