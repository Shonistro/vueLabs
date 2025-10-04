<script setup>
import { inject, computed } from 'vue'

const props = defineProps({ id: { type: [String, Number], required: true } })

const tabs = inject('tabs')
if (!tabs) throw new Error('TabPanel must be used inside Tabs')

const isActive = computed(() => tabs.activeTab && tabs.activeTab.value == props.id)
</script>

<template>
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>

<style scoped>
</style>
