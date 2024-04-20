<script setup>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import ImageUploader from './ImageUploader.vue'

const props = defineProps(nodeViewProps)

function onUpload(url) {
  if (url)
    props.editor.chain().setImageBlock({ src: url }).deleteRange({ from: props.getPos(), to: props.getPos() }).focus().run()
}
</script>

<template>
  <NodeViewWrapper>
    <div data-drag-handle m-0 p-0>
      <ImageUploader :on-upload="onUpload" />
    </div>
  </NodeViewWrapper>
</template>
