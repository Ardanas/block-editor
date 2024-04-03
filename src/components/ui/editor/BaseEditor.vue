<script setup>
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
// import FloatingMenu from '@tiptap/extension-floating-menu'
import SlashCommand from './extensions/slash-command.js'

const editor = useEditor({
  content: `<p>I’m running Tiptap with Vue.js. 🎉</p>
        <p></p>
        <p></p>`,
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3, 4],
      },
    }),
    // FloatingMenu.configure({
    //   element: document.querySelector('.floating-menu'),
    //   tippyOptions: {
    //     duration: 100,
    //   },
    // }),
    SlashCommand,
    // Highlight.configure({
    //   multicolor: true,
    // }),
  ],
  autofocus: true,
})

onUnmounted(() => {
  editor.value.destroy()
})

function focus() {
  editor.value?.chain().focus().run()
}
</script>

<template>
  <div border p-lg @click="focus">
    hello:
    <EditorContent :editor="editor" />
    <!-- <bubble-menu :editor="editor" /> -->
    <!-- <FloatingMenu v-if="editor" :editor="editor" :tippy-options="{ duration: 100 }">
      <Button :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
        H1
      </Button>
      <Button :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
        H2
      </Button>
      <Button :class="{ 'is-active': editor.isActive('bulletList') }" @click="editor.chain().focus().toggleBulletList().run()">
        Bullet List
      </Button>
    </FloatingMenu> -->
  </div>
</template>

<style>
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }
}
</style>
