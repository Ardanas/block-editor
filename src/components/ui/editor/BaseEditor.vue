<script setup>
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { cx } from 'class-variance-authority'
import { InputRule } from '@tiptap/core'
// import FloatingMenu from '@tiptap/extension-floating-menu'
import TiptapLink from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TiptapUnderline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import GlobalDragHandle from 'tiptap-extension-global-drag-handle'
import AutoJoiner from 'tiptap-extension-auto-joiner'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import { TaskItem } from '@tiptap/extension-task-item'
import { TaskList } from '@tiptap/extension-task-list'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { FocusClasses as Focus } from '@tiptap/extension-focus'
import { CharacterCount } from '@tiptap/extension-character-count'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import { HocuspocusProvider } from '@hocuspocus/provider'
import * as Y from 'yjs'
import { common, createLowlight } from 'lowlight'
import SlashCommand from './extensions/slash-command.js'
import TableofContents from './extensions/TableOfContents'
import { Table, TableCell, TableHeader, TableRow } from './extensions/table'

const ydoc = new Y.Doc()

const provider = new HocuspocusProvider({
  url: 'ws://127.0.0.1:1234',
  name: 'example-document',
  document: ydoc,
})

const lowlight = createLowlight(common)
const limit = 50000
const editor = useEditor({
  autofocus: false,
  onCreate: ({ editor }) => {
    provider?.on('synced', () => {
      if (editor.isEmpty) {
        editor.commands.setContent(`<h1>Welcome you !!</h1>
          <p>I’m running Tiptap with Vue.js. 🎉</p>
          <p></p>
          <p></p>
      `)
      }
    })
  },
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
      history: false,
    }),
    Collaboration.configure({
      document: ydoc,
    }),
    CollaborationCursor.configure({
      provider,
      user: {
        name: `user_${Math.random()}`,
        color: '#fb7185',
      },
    }),
    Table,
    TableCell,
    TableHeader,
    TableRow,
    TiptapUnderline,
    TextStyle,
    Color,
    Highlight.configure({
      multicolor: true,
    }),
    Focus,
    Typography,
    SlashCommand,
    TableofContents,
    GlobalDragHandle.configure({
      scrollTreshold: 0,
    }),
    CharacterCount.configure({
      limit,
    }),
    Placeholder.configure({
      // placeholder: ({ node }) => {
      //   console.log('node', node)
      //   if (node.type.name === 'heading')
      //     return `Heading ${node.attrs.level}`

      //   return 'Press \' / \' for commands'
      //   // return ''
      // },
      includeChildren: true,
      showOnlyCurrent: false,
      placeholder: () => '',
    }),
    TiptapLink.configure({
      HTMLAttributes: {
        class: cx(
          'text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer',
        ),
      },
    }),
    HorizontalRule.extend({
      addInputRules() {
        return [
          new InputRule({
            find: /^(?:---|—-|___\s|\*\*\*\s)$/,
            handler: ({ state, range }) => {
              const attributes = {}

              const { tr } = state
              const start = range.from
              const end = range.to

              tr.insert(start - 1, this.type.create(attributes)).delete(
                tr.mapping.map(start),
                tr.mapping.map(end),
              )
            },
          }),
        ]
      },
    }).configure({
      HTMLAttributes: {
        class: cx('mt-4 mb-6 border-0 border-t border-stone-300'),
      },
    }),
    TaskList.configure({
      HTMLAttributes: {
        class: cx('not-prose pl-2 '),
      },
    }),
    TaskItem.configure({
      HTMLAttributes: {
        class: cx('flex gap-2 items-start my-4'),
      },
      nested: true,
    }),
    CodeBlockLowlight.configure({
      lowlight,
      defaultLanguage: null,
      HTMLAttributes: {
        class: cx(
          'rounded-md bg-muted text-muted-foreground border p-5 font-mono font-medium',
        ),
      },
    }),
    AutoJoiner,
  ],
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
    <header w-full bg-white text-right>
      <div v-if="editor" color-gray-500>
        {{ editor.storage.characterCount.characters() }}/{{ limit }} characters
        <br>
        {{ editor.storage.characterCount.words() }} words
      </div>
    </header>
    <EditorContent :editor="editor" max-w-full prose-truegray focus:outline-none dark:prose-invert />
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
./extensions/Table/index.js
