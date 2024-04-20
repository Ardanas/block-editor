<script setup>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import { cn } from '@/lib/utils'

const props = defineProps(nodeViewProps)

const wrapperClassName = computed(() => {
  const node = props.node
  return cn(
    node.attrs.align === 'left' ? 'ml-0' : 'ml-auto',
    node.attrs.align === 'right' ? 'mr-0' : 'mr-auto',
    node.attrs.align === 'center' && 'mx-auto',
  )
})

function onClick() {
  props.editor.commands.setNodeSelection(props.getPos())
}
</script>

<template>
  <NodeViewWrapper>
    <div
      :class="wrapperClassName" :style="{ width: props.node.attrs.width }"
    >
      <div :contentEditable="false">
        <img class="block" :src="props.node.src" alt="" @click="onClick">
      </div>
    </div>
  </NodeViewWrapper>
</template>
