<template>
  <div class="app">
    <h1>DocumentUploader</h1>

    <DocumentUploader v-model="uploadedFiles" :documents="availableDocuments" :maxFiles="5" @remove:document="onRemoveDoc" />

    <section class="state">
      <h2>Uploaded files</h2>
      <ul>
        <li v-for="f in uploadedFiles" :key="f.name">{{ f.name }}</li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const uploadedFiles = ref<File[]>([])

const availableDocuments = [
  { type: 'pdf', icon: '/icons/pdf.svg', name: 'Contract.pdf' },
  { type: 'docx', icon: '/icons/docx.svg', name: 'Report.docx' },
  { type: 'xlsx', icon: '/icons/xlsx.svg', name: 'Data.xlsx' }
]

function onRemoveDoc(index: number) {
  console.log('Prepared doc removed at', index)
}
</script>

<style scoped>
.app {
  width: 880px;
  margin: 40px auto;
}

.state { margin-top: 24px }
</style>