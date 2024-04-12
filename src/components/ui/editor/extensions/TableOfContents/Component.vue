<script setup>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import { onMounted, ref } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps(nodeViewProps)
const headings = ref([])

function handleUpdate() {
  const newHeadings = []
  const transaction = props.editor.state.tr

  props.editor.state.doc.descendants((node, pos) => {
    if (node.type.name === 'heading') {
      const id = `heading-${newHeadings.length + 1}`

      if (node.attrs.id !== id) {
        transaction.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          id,
        })
      }

      newHeadings.push({
        level: node.attrs.level,
        text: node.textContent,
        id,
      })
    }
  })

  transaction.setMeta('addToHistory', false)
  transaction.setMeta('preventUpdate', true)

  props.editor.view.dispatch(transaction)

  headings.value = newHeadings
}

onMounted(() => {
  props.editor.on('update', handleUpdate)
  props.editor.on('selectionUpdate', handleUpdate)

  handleUpdate()
})
</script>

<template>
  <NodeViewWrapper>
    <div rounded-lg p-2 m="-2" :contentEditable="false">
      <div mb-2 text-xs text-neutral-500 font-semibold uppercase dark:text-neutral-400>
        Table of contents
      </div>
      <template v-if="headings.length">
        <div
          v-for="(heading, index) in headings"
          :key="index"
          flex flex-col gap-1
        >
          <a
            :href="`#${heading.id}`"
            :style="{
              marginLeft: `${1 * heading.level - 1}rem`,
            }"
            :class="cn(
              'block font-medium text-neutral-500 dark:text-neutral-300 p-1 rounded bg-opacity-10 text-sm hover:text-neutral-800 transition-all hover:bg-black hover:bg-opacity-5 truncate',
              heading.isActive && 'text-neutral-800 bg-neutral-100 dark:text-neutral-100 dark:bg-neutral-900',
            )"
          >
            {{ heading.text }}
          </a>
        </div>
      </template>
      <div v-else text-sm text-neutral-500>
        Start adding headlines to your document …
      </div>
    </div>
  </NodeViewWrapper>
</template>
