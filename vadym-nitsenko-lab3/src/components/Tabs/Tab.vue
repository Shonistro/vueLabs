<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  id: { type: [String, Number], required: true }
})

const tabs = inject('tabs')
if (!tabs) throw new Error('Tab must be used inside Tabs')

const isActive = computed(() => tabs.activeTab && tabs.activeTab.value == props.id)

function onClick() {
  tabs.setActive(props.id)
}

const base = 'cursor-pointer focus:outline-none'

const classes = computed(() => {
  const variant = tabs.variant || 'underline'
  if (variant === 'pills') {
    return [base, 'px-4 py-2 rounded-full', isActive.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700']
  }
  if (variant === 'boxed') {
    return [base, 'px-4 py-2 border rounded-md -mr-px', isActive.value ? 'bg-white border-blue-600 text-blue-600' : 'bg-white border-gray-200 text-gray-700']
  }
  // underline
  return [base, 'px-4 py-2', isActive.value ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-700']
})
</script>

<template>
  <button :class="classes" type="button" @click="onClick">
    <slot></slot>
  </button>
</template>

<style scoped>
</style>
