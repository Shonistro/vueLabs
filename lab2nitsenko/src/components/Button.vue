<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, default: '' },
  color: { type: String, default: 'blue' },
  size: { type: String, default: 'md' },
  icon: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['click'])

const sizes = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base'
}

const colors = {
  blue: 'bg-blue-600 hover:bg-blue-700 text-white',
  red: 'bg-red-600 hover:bg-red-700 text-white',
  green: 'bg-emerald-600 hover:bg-emerald-700 text-white',
  gray: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
}

const classes = computed(() => {
  const sizeClass = sizes[props.size] || sizes.md
  const colorClass = colors[props.color] || colors.blue
  const base = 'inline-flex items-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2'
  const disabled = props.disabled ? 'opacity-50 cursor-not-allowed' : 'shadow'
  return [base, sizeClass, colorClass, disabled].join(' ')
})

function onClick(e) {
  if (props.disabled) return
  emit('click', e)
}
</script>

<template>
  <button :class="classes" @click="onClick" type="button">
    <template v-if="icon">
      <span class="mr-2" aria-hidden>
        <span v-html="icon"></span>
      </span>
    </template>
    <span>{{ label }}</span>
  </button>
</template>

<style scoped>  
</style>
