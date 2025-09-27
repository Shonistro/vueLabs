<script setup>
import Button from './components/Button.vue'
import SearchableDropdown from './components/SearchableDropdown.vue'

import { ref, computed } from 'vue'

const selected = ref(null)

const selectedLabel = computed(() => {
  if (!selected.value) return '—'
  const icon = selected.value.icon ? (selected.value.icon + ' ') : ''
  return icon + (selected.value.label ?? selected.value)
})

const items = [
  { value: 1, label: 'Apple', icon: '🍎' },
  { value: 2, label: 'Banana', icon: '🍌' },
  { value: 3, label: 'Cherry', icon: '🍒' },
  { value: 4, label: 'Lemon', icon: '🍋' }
]
</script>

<template>
  <div class="space-y-6">
    <header class="text-center">
      <img alt="Vue logo" class="logo mx-auto" src="./assets/logo.svg" width="125" height="125" />
      <h1 class="text-2xl font-bold">Demo</h1>
    </header>

    <section>
      <h2 class="text-xl font-semibold mb-2">Button variants</h2>
      <div class="flex gap-4 flex-wrap">
        <Button label="Primary" color="blue" />
        <Button label="Danger" color="red" />
        <Button label="Success" color="green" size="sm" />
        <Button label="With Icon" color="gray" :icon="'<svg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\' class=\'w-4 h-4\'><path stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M5 13l4 4L19 7\' /></svg>'" />
      </div>
    </section>

    <section>
      <h2 class="text-xl font-semibold mb-2">Searchable dropdown</h2>
      <div class="space-y-4">
        <div>
          <SearchableDropdown :items="items" v-model="selected" placeholder="Choose a fruit" />
          <div class="mt-2">Selected: <span v-html="selectedLabel"></span></div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
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
}
</style>
