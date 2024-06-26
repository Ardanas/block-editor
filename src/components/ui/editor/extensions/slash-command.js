import { VueRenderer } from '@tiptap/vue-3'
import tippy from 'tippy.js'
import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import { Book, CheckSquare, Code, Heading1, Heading2, Heading3, Image, Italic, List, ListOrdered, Table2, TextQuote, Type } from 'lucide-vue-next'

import CommandsList from './CommandsList.vue'

function getSuggestionItems({
  query,
//   plan,
}) {
  return [
    {
      title: 'Text',
      description: 'Just start typing with plain text.',
      searchTerms: ['p', 'paragraph'],
      icon: Type,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode('paragraph', 'paragraph')
          .run()
      },
    },
    {
      title: 'To-do List',
      description: 'Track tasks with a to-do list.',
      searchTerms: ['todo', 'task', 'list', 'check', 'checkbox'],
      icon: CheckSquare,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run()
      },
    },
    {
      title: 'Heading 1',
      description: 'Big section heading.',
      searchTerms: ['title', 'big', 'large'],
      icon: Heading1,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 1 })
          .run()
      },
    },
    {
      title: 'Heading 2',
      description: 'Medium section heading.',
      searchTerms: ['subtitle', 'medium'],
      icon: Heading2,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 2 })
          .run()
      },
    },
    {
      title: 'Heading 3',
      description: 'Small section heading.',
      searchTerms: ['subtitle', 'small'],
      icon: Heading3,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 3 })
          .run()
      },
    },
    {
      title: 'table',
      description: 'Insert a table',
      searchTerms: ['table', 'cell', 'row'],
      // shouldBeHidden: editor => editor.isActive('columns'),
      icon: Table2,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()
      },
    },
    {
      title: 'Table of Contents',
      icon: Book,
      searchTerms: ['toc'],
      description: 'Insert a table of contents',
      command: ({ editor }) => {
        editor.chain().focus().insertTableOfContents().run()
      },
    },
    {
      title: 'Image',
      icon: Image,
      description: 'Insert an image',
      searchTerms: ['img'],
      command: ({ editor }) => {
        editor.chain().focus().setImageUpload().run()
      },
    },
    {
      title: 'Bullet List',
      description: 'Create a simple bullet list.',
      searchTerms: ['unordered', 'point'],
      icon: List,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run()
      },
    },
    {
      title: 'Numbered List',
      description: 'Create a list with numbering.',
      searchTerms: ['ordered'],
      icon: ListOrdered,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run()
      },
    },
    {
      title: 'Quote',
      description: 'Capture a quote.',
      searchTerms: ['blockquote'],
      icon: TextQuote,
      command: ({ editor, range }) =>
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode('paragraph', 'paragraph')
          .toggleBlockquote()
          .run(),
    },
    {
      title: 'Code',
      description: 'Capture a code snippet.',
      searchTerms: ['codeblock'],
      icon: Code,
      command: ({ editor, range }) =>
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
    {
      title: 'Italic',
      description: 'Small section heading.',
      icon: Italic,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setMark('italic')
          .run()
      },
    },
  ].filter((item) => {
    if (typeof query === 'string' && query.length > 0) {
      const search = query.toLowerCase()
      return (
        item.title.toLowerCase().includes(search)
        || item.description.toLowerCase().includes(search)
        || (item.searchTerms
        && item.searchTerms.some(term => term.includes(search)))
      )
    }
    return true
  })
}

function renderItems() {
  let component
  let popup
  return {
    onStart: (props) => {
      component = new VueRenderer(CommandsList, {
        // using vue 2:
        // parent: this,
        // propsData: props,
        props,
        editor: props.editor,
      })

      if (!props.clientRect)
        return

      popup = tippy('body', {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
      })
    },
    onUpdate: (props) => {
      component.updateProps(props)

      if (!props.clientRect)
        return

      popup[0].setProps({
        getReferenceClientRect: props.clientRect,
      })
    },
    onKeyDown: (props) => {
      if (props.event.key === 'Escape') {
        popup[0].hide()

        return true
      }

      return component.ref?.onKeyDown(props)
    },
    onExit: () => {
      popup[0].destroy()
      component.destroy()
    },
  }
}

const Commands = Extension.create({
  name: 'slash-commands',
  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({
          editor,
          range,
          props,
        }) => {
          props.command({ editor, range })
        },
      },
    }
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})

const SlashCommand = Commands.configure({
  suggestion: {
    items: getSuggestionItems,
    render: renderItems,
  },
})

export default SlashCommand
