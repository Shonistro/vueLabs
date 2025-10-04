<script setup>
import DropdownItem from './DropdownItem.vue'
const props = defineProps({ items: { type: Array, default: () => [] }, highlightedIndex: { type: Number, default: -1 } })
const emit = defineEmits(['select'])
</script>

<template>
  <div class="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-auto">
    <template v-if="props.items.length">
      <ul>
        <DropdownItem v-for="(item, idx) in props.items" :key="item.value ?? item" :item="item" :highlighted="idx === props.highlightedIndex" @select="val => emit('select', val)" />
      </ul>
    </template>
  <div v-else class="p-3 text-gray-500">Nothing found</div>
  </div>
</template>

<style scoped></style>
