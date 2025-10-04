<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Select...' }
})
</script>

<template>
  <div class="flex items-center gap-2 w-full">
    <input
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @focus="$emit('focus')"
      @input="$emit('update:modelValue', $event.target.value); $emit('input')"
      class="w-full border rounded px-3 py-2 focus:ring" />
    <slot name="actions" />
  </div>
</template>

<style scoped>
</style>
