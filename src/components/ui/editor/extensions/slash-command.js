import { VueRenderer } from '@tiptap/vue-3'
import tippy from 'tippy.js'
import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import { Heading1, Heading2, Heading3, Italic, Type } from 'lucide-vue-next'

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
      title: 'Heading 1',
      description: 'Big section heading.',
      searchTerms: ['title', 'big', 'large'],
      icon: Heading1,
      command: ({ editor, range }) => {
        console.log('editor, range', editor, range)
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
      title: 'italic',
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
