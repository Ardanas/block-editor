<script setup>
import { BubbleMenu } from '@tiptap/vue-3'
import { provide } from 'vue'

const props = defineProps({
  editor: {
    type: Object,
    required: true,
  },
})

provide('editor', props.editor)
</script>

<template>
  <BubbleMenu
    :editor="props.editor"
    :tippy-options="{ duration: 100 }"
    max-w="90vw" h-9 w-fit flex items-center overflow-hidden border border-muted rounded-md bg-background shadow-md
  >
    <slot />
  </BubbleMenu>
</template>
