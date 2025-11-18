<template>
  <div class="uploader">
    <div class="drop-zone" :class="{ 'is-dragover': dragActive }" @click="openFileDialog" @dragenter.prevent="onDragEnter" @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
      <input ref="fileInput" class="file-input" type="file" multiple @change="onFileChange" />
      <div class="drop-content">
        <p>Drag & Drop files here or click to select</p>
        <p class="helper">Max files: {{ maxFiles }}</p>
      </div>
    </div>

    <div class="preview-grid">
      <div v-for="(doc, index) in localDocuments" :key="`doc-${index}-${doc.name}`" class="preview-item doc-item">
        <img :src="doc.icon" alt="doc-icon" class="doc-icon"/>
        <div class="doc-name">{{ doc.name }}</div>
        <button class="btn-delete" @click="removePrepared(index)">✕</button>
      </div>

      <div v-for="(fileObj, index) in previews" :key="`file-${index}-${fileObj.file.name}`" class="preview-item file-item">
        <img :src="fileObj.url" alt="preview" class="preview-img"/>
        <div class="file-name">{{ fileObj.file.name }}</div>
        <button class="btn-delete" @click="removeFile(index)">✕</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onUnmounted, defineProps, defineEmits } from 'vue'

const props = defineProps({ modelValue: Array, documents: Array, maxFiles: Number })
const emit = defineEmits(['update:modelValue', 'remove:document'])

const fileInput = ref(null)
const dragActive = ref(false)

const uploadedFiles = ref(props.modelValue ? [...props.modelValue] : [])
const localDocuments = ref(props.documents ? [...props.documents] : [])

const objectUrls = new Map()

const previews = computed(() => {
  return uploadedFiles.value.map((file) => {
    let url = objectUrls.get(file)
    if (!url) {
      url = URL.createObjectURL(file)
      objectUrls.set(file, url)
    }
    return { file, url }
  })
})

watch(() => props.modelValue, (nv) => { if (!nv) return; uploadedFiles.value = [...nv] })
watch(() => props.documents, (nv) => { if (!nv) return; localDocuments.value = [...nv] })

function openFileDialog() { fileInput.value?.click() }
function onDragEnter() { dragActive.value = true }
function onDragOver() { dragActive.value = true }
function onDragLeave() { dragActive.value = false }

function onDrop(e) {
  dragActive.value = false
  const dt = e.dataTransfer
  if (!dt) return
  if (dt.files && dt.files.length) addFiles([...dt.files])
}

function onFileChange(e) { const target = e.target; if (target.files && target.files.length) addFiles([...target.files]); if (fileInput.value) fileInput.value.value = '' }

function addFiles(files) { const max = props.maxFiles ?? 5; const remain = Math.max(0, max - uploadedFiles.value.length); const toAdd = files.slice(0, remain); if (toAdd.length < files.length) window.alert(`Only ${remain} files allowed (${max} maximum).`); uploadedFiles.value.push(...toAdd); emit('update:modelValue', [...uploadedFiles.value]) }

function removeFile(index) { const file = uploadedFiles.value[index]; const url = objectUrls.get(file); if (url) { URL.revokeObjectURL(url); objectUrls.delete(file) }; uploadedFiles.value.splice(index, 1); emit('update:modelValue', [...uploadedFiles.value]) }

function removePrepared(index) { localDocuments.value.splice(index, 1); emit('remove:document', index) }

onUnmounted(() => { objectUrls.forEach(u => URL.revokeObjectURL(u)); objectUrls.clear() })
</script>

<style scoped lang="scss">
.uploader {
  .drop-zone {
    border: 2px dashed #d2d2d2;
    border-radius: 8px;
    padding: 24px;
    cursor: pointer;
    position: relative;
    transition: border-color .2s ease, background .2s ease;

    &.is-dragover {
      border-color: #4b9bff;
      background: rgba(75, 155, 255, 0.03);
    }

    .file-input {
      display: none;
    }

    .drop-content {
      text-align: center;
      color: #666;
      p { margin: 6px 0 }
      .helper {
        font-size: 12px;
        color: #999;
      }
    }
  }

  .preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 16px;
    margin-top: 18px;

    .preview-item {
      position: relative;
      padding: 8px;
      border-radius: 6px;
      border: 1px solid #eee;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;

      .preview-img {
        width: 100%;
        height: 80px;
        object-fit: cover;
        border-radius: 4px;
      }

      .doc-icon {
        width: 48px;
        height: 48px;
      }

      .doc-name, .file-name {
        font-size: 13px;
        color: #333;
        text-align: center;
        word-break: break-all;
      }

      .btn-delete {
        position: absolute;
        right: 8px;
        top: 6px;
        background: rgba(0,0,0,0.04);
        border: none;
        border-radius: 50%;
        width: 26px;
        height: 26px;
        line-height: 26px;
        cursor: pointer;
      }
    }
  }
}
</style>