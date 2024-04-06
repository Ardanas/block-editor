<script setup>
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { cx } from 'class-variance-authority'
// import FloatingMenu from '@tiptap/extension-floating-menu'
import TiptapLink from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TiptapUnderline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import GlobalDragHandle from 'tiptap-extension-global-drag-handle'
import AutoJoiner from 'tiptap-extension-auto-joiner'
import SlashCommand from './extensions/slash-command.js'

const editor = useEditor({
  content: `<h1>Welcome you !!</h1>
    <p>I’m running Tiptap with Vue.js. 🎉</p>
    <p></p>
    <p></p>
  `,
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3, 4],
      },
      horizontalRule: false,
      bulletList: {
        HTMLAttributes: {
          class: cx('list-disc list-outside leading-3 -mt-2'),
        },
      },
      orderedList: {
        HTMLAttributes: {
          class: cx('list-decimal list-outside leading-3 -mt-2'),
        },
      },
      listItem: {
        HTMLAttributes: {
          class: cx('leading-normal -mb-2'),
        },
      },
      blockquote: {
        HTMLAttributes: {
          class: cx('border-l-4 border-primary'),
        },
      },
      codeBlock: {
        HTMLAttributes: {
          class: cx(
            'rounded-md bg-muted text-muted-foreground border p-5 font-mono font-medium',
          ),
        },
      },
      code: {
        HTMLAttributes: {
          class: cx('rounded-md bg-muted  px-1.5 py-1 font-mono font-medium'),
          spellcheck: 'false',
        },
      },
      dropcursor: {
        color: '#DBEAFE',
        width: 4,
      },
      gapcursor: false,

    }),
    // FloatingMenu.configure({
    //   element: document.querySelector('.floating-menu'),
    //   tippyOptions: {
    //     duration: 100,
    //   },
    // }),
    TiptapUnderline,
    TextStyle,
    Color,
    Highlight.configure({
      multicolor: true,
    }),
    SlashCommand,
    GlobalDragHandle.configure({
      scrollTreshold: 0,
    }),
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === 'heading')
          return `Heading ${node.attrs.level}`

        return 'Press \' / \' for commands'
      },
      includeChildren: true,
    }),
    TiptapLink.configure({
      HTMLAttributes: {
        class: cx(
          'text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer',
        ),
      },
    }),
    AutoJoiner,

  ],
  autofocus: false,
})

onUnmounted(() => {
  editor.value.destroy()
})

// function focus() {
//   editor.value?.chain().focus().run()
// }

// const open = ref(false)
// function setOpen(isOpen) {
//   open.value = isOpen
// }
</script>

<template>
  <div>
    <EditorContent :editor="editor" max-w-full text-lg prose focus:outline-none dark:prose-invert />
    <EditorBubble v-if="editor" :editor="editor">
      <NodeSelector />
      <Separator orientation="vertical" />
      <LinkSelector />
      <Separator orientation="vertical" />
      <TextButtonsSelector />
      <Separator orientation="vertical" />
      <ColorSelector />
    </EditorBubble>
  </div>
</template>

<style>
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }
}
</style>
