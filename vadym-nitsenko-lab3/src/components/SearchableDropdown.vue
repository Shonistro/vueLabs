<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import DropdownInput from './searchable-dropdown/DropdownInput.vue'
import DropdownList from './searchable-dropdown/DropdownList.vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  modelValue: { type: [String, Object, Number], default: null },
  placeholder: { type: String, default: 'Select...' }
})

const emit = defineEmits(['update:modelValue', 'select'])

const open = ref(false)
const query = ref('')
const highlighted = ref(-1)
const internal = ref(props.modelValue)

watch(() => props.modelValue, v => { internal.value = v })

const filtered = computed(() => {
  if (!query.value) return props.items
  return props.items.filter(i => String(i.label ?? i).toLowerCase().includes(query.value.toLowerCase()))
})

function select(item) {
  internal.value = item
  emit('update:modelValue', item)
  emit('select', item)
  
  query.value = ''
  highlighted.value = -1
  open.value = false
}

function clear() {
  internal.value = null
  emit('update:modelValue', null)
}

function onKeydown(e) {
  if (!open.value && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) open.value = true
  if (e.key === 'ArrowDown') {
    highlighted.value = Math.min(highlighted.value + 1, filtered.value.length - 1)
    e.preventDefault()
  }
  if (e.key === 'ArrowUp') {
    highlighted.value = Math.max(highlighted.value - 1, 0)
    e.preventDefault()
  }
  if (e.key === 'Enter' && highlighted.value >= 0) {
    select(filtered.value[highlighted.value])
    e.preventDefault()
  }
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('click', (e) => {
    const path = e.composedPath && e.composedPath()
    if (!path) return
    const inside = path.some(n => n.classList && n.classList.contains && n.classList.contains('searchable-dropdown'))
    if (!inside) open.value = false
  })
})
</script>

<template>
  <div class="relative searchable-dropdown" @keydown="onKeydown">
    <DropdownInput :modelValue="query" :placeholder="placeholder" @update:modelValue="val => query = val" @focus="open = true" @input="highlighted = 0">
      <template #actions>
        <button @click.prevent="clear" class="text-sm text-gray-600">Clear</button>
      </template>
    </DropdownInput>

    <DropdownList v-if="open" :items="filtered" :highlightedIndex="highlighted" @select="select" />
  </div>
</template>

<style scoped>
.searchable-dropdown { min-width: 220px }
</style>
