<script setup>
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [
    StarterKit,
  ],
  autofocus: true,
})

onUnmounted(() => {
  editor.value.destroy()
})
</script>

<template>
  <div>
    <EditorContent :editor="editor" />
  </div>
</template>
