<script setup>
import {
  Check,
  Trash,
} from 'lucide-vue-next'

import { inject } from 'vue'

const editor = inject('editor')

const inputValue = ref('')

function getUrlFromString(str) {
  if (new URL(str))
    return str
  try {
    if (str.includes('.') && !str.includes(' '))
      return new URL(`https://${str}`).toString()
  }
  catch (e) {
    return null
  }
}

function onTrash() {
  editor.chain().focus().unsetLink().run()
}

function onCheck() {
  const url = getUrlFromString(inputValue.value)
  url && editor.chain().focus().setLink({ href: url }).run()
}
</script>

<template>
  <Popover>
    <PopoverTrigger>
      <Button size="sm" variant="ghost" gap-2 rounded-none border-none>
        <p text-base>
          ↗
        </p>
        <p
          :class="{ 'text-blue-500': editor.isActive('link') }"
          whitespace-nowrap text-sm underline decoration-stone-400 underline-offset-4
        >
          Link
        </p>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-60 p-2" align="start" :side-offset="10">
      <div flex gap-2>
        <Input v-model="inputValue" placeholder="Paste a link" />
        <Button
          v-if="editor.getAttributes('link').href"
          size="icon"
          variant="outline"
          type="button"
          flex items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800 @click="onTrash"
        >
          <Trash h-4 w-4 />
        </Button>
        <Button v-else size="icon" h-8 @click="onCheck">
          <Check h-4 w-4 />
        </Button>
      </div>
    </PopoverContent>
  </Popover>
</template>
