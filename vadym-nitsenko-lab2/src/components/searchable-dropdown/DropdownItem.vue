<script setup>
const props = defineProps({ item: { type: [Object, String, Number], required: true }, highlighted: { type: Boolean, default: false } })
const emit = defineEmits(['select'])
</script>

<template>
  <li @click.prevent="emit('select', props.item)" :class="['px-3 py-2 cursor-pointer hover:bg-gray-100', { 'bg-gray-100': props.highlighted }]">
    <div class="flex items-center gap-2">
      <span v-if="props.item.icon" v-html="props.item.icon" class="w-6 h-6" />
      <span>{{ props.item.label ?? props.item }}</span>
    </div>
  </li>
</template>

<style scoped></style>
