import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Component from './Component.vue'

export default Node.create({
  name: 'tableOfContents',

  group: 'block',

  atom: true,

  selectable: true,

  draggable: true,

  inline: false,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="table-of-content"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { ...HTMLAttributes, 'data-type': 'table-of-content' }]
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },

  addCommands() {
    return {
      insertTableOfContents:
        () =>
          ({ commands }) => {
            return commands.insertContent({
              type: this.name,
            })
          },
    }
  },
})
