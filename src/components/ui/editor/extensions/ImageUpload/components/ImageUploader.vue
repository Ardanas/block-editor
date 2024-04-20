<script setup>
import { Image, Upload } from 'lucide-vue-next'
import { useDropZone } from '@vueuse/core'
import { cn } from '@/lib/utils'

const imageDropZoneRef = ref()
const inputRef = ref()

const { isOverDropZone } = useDropZone(imageDropZoneRef, onImageDrop)

function onImageDrop(files) {
  console.log('files', files)
}

function handleUploadClick() {
  inputRef.value?.click()
}

function onFileChange(e) {
  console.dir(e.target)
  if (e.target.files) {
    const file = e.target.files[0]
    console.log('file', file)
  }
}

const wrapperClass = cn(
  'flex flex-col items-center justify-center px-8 py-10 rounded-lg bg-opacity-80 node-imageUpload',
  isOverDropZone && 'bg-neutral-100',
)
</script>

<template>
  <div
    ref="imageDropZoneRef"
    cursor-pointer
    :class="wrapperClass"
    @click="handleUploadClick"
  >
    <Image mb-4 h-12 w-12 text-black opacity-20 dark:text-white />
    <div flex flex-col items-center justify-center gap-2>
      <div text-center text-sm text-neutral-400 font-medium dark:text-neutral-500>
        {{ !isOverDropZone ? 'Drop image here' : 'Drag and drop or' }}
      </div>
      <div>
        <Button :disabled="isOverDropZone" size="sm">
          <div flex-center gap-2>
            <Upload size="4" />
            Upload an image
          </div>
        </Button>
      </div>
    </div>
    <input
      ref="inputRef"
      h-0 w-0 overflow-hidden opacity-0
      type="file"
      accept="image/*"
      :onChange="onFileChange"
    >
  </div>
</template>
