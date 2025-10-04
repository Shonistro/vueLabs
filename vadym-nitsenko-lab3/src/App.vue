<script setup>
import Button from './components/Button.vue'
import SearchableDropdown from './components/SearchableDropdown.vue'
import Tabs from './components/Tabs/Tabs.vue'
import Tab from './components/Tabs/Tab.vue'
import TabPanel from './components/Tabs/TabPanel.vue'

import { ref, computed } from 'vue'

const selected = ref(null)

const selectedLabel = computed(() => {
  if (!selected.value) return ''
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
  <div class="min-h-screen flex items-center justify-center p-6">
    <div class="w-full max-w-3xl space-y-6">



    <header class="text-center">
      <img alt="Vue logo" class="logo mx-auto" src="./assets/logo.svg" width="125" height="125" />
  <h1 class="text-2xl font-bold">Demo</h1>
    </header>

    <section>
      <h2 class="text-xl font-semibold mb-2">Searchable dropdown</h2>
      <div class="space-y-4">
        <div>
          <SearchableDropdown :items="items" v-model="selected" placeholder="Choose a fruit" />
          <div class="mt-2">Selected: <span v-html="selectedLabel"></span></div>
        </div>
      </div>
    </section>

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
  <h2 class="text-xl font-semibold mb-2">Tabs  underline</h2>
      <Tabs defaultTab="home" variant="underline">
        <template #tabs>
          <div class="flex border-b space-x-2">
            <Tab id="home">Home</Tab>
            <Tab id="profile">Profile</Tab>
            <Tab id="settings">Settings</Tab>
          </div>
        </template>

        <template #panels>
          <TabPanel id="home">
            <div class="p-4">Welcome to the home tab.</div>
          </TabPanel>
          <TabPanel id="profile">
            <div class="p-4">User profile content goes here.</div>
          </TabPanel>
          <TabPanel id="settings">
            <div class="p-4">Settings content.</div>
          </TabPanel>
        </template>
      </Tabs>
    </section>

    <section>
  <h2 class="text-xl font-semibold mb-2">Tabs pills with icons</h2>
      <Tabs defaultTab="one" variant="pills">
        <template #tabs>
          <div class="flex gap-2">
            <Tab id="one">Home</Tab>
            <Tab id="two">Alerts</Tab>
            <Tab id="three">Tools</Tab>
          </div>
        </template>

        <template #panels>
          <TabPanel id="one"><div class="p-4">Home</div></TabPanel>
          <TabPanel id="two"><div class="p-4">Alerts</div></TabPanel>
          <TabPanel id="three"><div class="p-4">Tools</div></TabPanel>
        </template>
      </Tabs>
    </section>

    <section>
  <h2 class="text-xl font-semibold mb-2">Tabs boxed with custom content</h2>
      <Tabs defaultTab="a" variant="boxed">
        <template #tabs>
          <div class="inline-flex gap-1">
            <Tab id="a"><div class="flex items-center"><strong class="mr-2">A</strong><span class="text-sm">Custom A</span></div></Tab>
            <Tab id="b"><div class="flex items-center"><strong class="mr-2">B</strong><span class="text-sm">Custom B</span></div></Tab>
            <Tab id="c"><div class="flex items-center"><strong class="mr-2">C</strong><span class="text-sm">Custom C</span></div></Tab>
          </div>
        </template>

        <template #panels>
          <TabPanel id="a"><div class="p-4">Custom content A</div></TabPanel>
          <TabPanel id="b"><div class="p-4">Custom content B</div></TabPanel>
          <TabPanel id="c"><div class="p-4">Custom content C</div></TabPanel>
        </template>
      </Tabs>
    </section>
    </div>
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

header {
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.logo {
  display: block;
  margin: 0 1rem 0 0;
}

header .wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>
