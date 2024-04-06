<script setup>
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-vue-next'
import { inject } from 'vue'

const editor = inject('editor')

const items = [
  {
    name: 'bold',
    isActive: editor => editor.isActive('bold'),
    command: editor => editor.chain().focus().toggleBold().run(),
    icon: BoldIcon,
  },
  {
    name: 'italic',
    isActive: editor => editor.isActive('italic'),
    command: editor => editor.chain().focus().toggleItalic().run(),
    icon: ItalicIcon,
  },
  {
    name: 'underline',
    isActive: editor => editor.isActive('underline'),
    command: editor => editor.chain().focus().toggleUnderline().run(),
    icon: UnderlineIcon,
  },
  {
    name: 'strike',
    isActive: editor => editor.isActive('strike'),
    command: editor => editor.chain().focus().toggleStrike().run(),
    icon: StrikethroughIcon,
  },
  {
    name: 'code',
    isActive: editor => editor.isActive('code'),
    command: editor => editor.chain().focus().toggleCode().run(),
    icon: CodeIcon,
  },
]

function onSelect(item) {
  item.command(editor)
}
</script>

<template>
  <div flex>
    <Button
      v-for="item in items" :key="item.name" size="sm" rounded-none
      variant="ghost"
      @click="onSelect(item)"
    >
      <component :is="item.icon" h-4 w-4 :class="{ 'text-blue-500': item.isActive(editor) }" />
    </Button>
  </div>
</template>
