<script setup>
import {
  Check,
  CheckSquare,
  ChevronDown,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ListOrdered,
  TextIcon,
  TextQuote,
} from 'lucide-vue-next'

import { inject } from 'vue'

const editor = inject('editor')

const items = [
  {
    name: 'Text',
    icon: TextIcon,
    command: editor => editor.chain().focus().clearNodes().run(),
    // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
    isActive: editor =>
      editor.isActive('paragraph')
      && !editor.isActive('bulletList')
      && !editor.isActive('orderedList'),
  },
  {
    name: 'Heading 1',
    icon: Heading1,
    command: editor =>
      editor.chain().focus().clearNodes().toggleHeading({ level: 1 }).run(),
    isActive: editor => editor.isActive('heading', { level: 1 }),
  },
  {
    name: 'Heading 2',
    icon: Heading2,
    command: editor =>
      editor.chain().focus().clearNodes().toggleHeading({ level: 2 }).run(),
    isActive: editor => editor.isActive('heading', { level: 2 }),
  },
  {
    name: 'Heading 3',
    icon: Heading3,
    command: editor =>
      editor.chain().focus().clearNodes().toggleHeading({ level: 3 }).run(),
    isActive: editor => editor.isActive('heading', { level: 3 }),
  },
  {
    name: 'To-do List',
    icon: CheckSquare,
    command: editor =>
      editor.chain().focus().clearNodes().toggleTaskList().run(),
    isActive: editor => editor.isActive('taskItem'),
  },
  {
    name: 'Bullet List',
    icon: ListOrdered,
    command: editor =>
      editor.chain().focus().clearNodes().toggleBulletList().run(),
    isActive: editor => editor.isActive('bulletList'),
  },
  {
    name: 'Numbered List',
    icon: ListOrdered,
    command: editor =>
      editor.chain().focus().clearNodes().toggleOrderedList().run(),
    isActive: editor => editor.isActive('orderedList'),
  },
  {
    name: 'Quote',
    icon: TextQuote,
    command: editor =>
      editor.chain().focus().clearNodes().toggleBlockquote().run(),
    isActive: editor => editor.isActive('blockquote'),
  },
  {
    name: 'Code',
    icon: Code,
    command: editor =>
      editor.chain().focus().clearNodes().toggleCodeBlock().run(),
    isActive: editor => editor.isActive('codeBlock'),
  },
]
const activeItem = computed(() => items.filter(item => item.isActive(editor)).pop() ?? {
  name: 'Multiple',
})

function onSelect(item) {
  item.command(editor)
}
</script>

<template>
  <Popover>
    <PopoverTrigger>
      <Button size="sm" variant="ghost" gap-2>
        <span whitespace-nowrap text-sm>{{ activeItem.name }}</span>
        <ChevronDown h-4 w-4 />
      </Button>
    </PopoverTrigger>
    <PopoverContent :side-offset="5" align="start" class="w-48 px-1 py-1">
      <div v-for="item in items" :key="item.name" flex cursor-pointer items-center justify-between rounded-md p-1 text-sm hover:bg-accent @click="onSelect(item)">
        <div flex items-center space-x-2>
          <div border rounded-sm p-1>
            <component :is="item.icon" h-4 w-4 />
          </div>
          <span>{{ item.name }}</span>
        </div>
        <Check v-if="activeItem.name === item.name" h-4 w-4 />
      </div>
    </PopoverContent>
  </Popover>
</template>
