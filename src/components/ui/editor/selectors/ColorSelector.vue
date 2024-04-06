<script setup>
import {
  Check,
  ChevronDown,
} from 'lucide-vue-next'

import { inject } from 'vue'

const editor = inject('editor')

const TEXT_COLORS = [
  {
    name: 'Default',
    color: 'var(--black)',
  },
  {
    name: 'Purple',
    color: '#9333EA',
  },
  {
    name: 'Red',
    color: '#E00000',
  },
  {
    name: 'Yellow',
    color: '#EAB308',
  },
  {
    name: 'Blue',
    color: '#2563EB',
  },
  {
    name: 'Green',
    color: '#008A00',
  },
  {
    name: 'Orange',
    color: '#FFA500',
  },
  {
    name: 'Pink',
    color: '#BA4081',
  },
  {
    name: 'Gray',
    color: '#A8A29E',
  },
]

const HIGHLIGHT_COLORS = [
  {
    name: 'Default',
    color: 'var(--highlight-default)',
  },
  {
    name: 'Purple',
    color: 'var(--highlight-purple)',
  },
  {
    name: 'Red',
    color: 'var(--highlight-red)',
  },
  {
    name: 'Yellow',
    color: 'var(--highlight-yellow)',
  },
  {
    name: 'Blue',
    color: 'var(--highlight-blue)',
  },
  {
    name: 'Green',
    color: 'var(--highlight-green)',
  },
  {
    name: 'Orange',
    color: 'var(--highlight-orange)',
  },
  {
    name: 'Pink',
    color: 'var(--highlight-pink)',
  },
  {
    name: 'Gray',
    color: 'var(--highlight-gray)',
  },
]

const activeColorItem = computed(() => {
  return TEXT_COLORS.find(({ color }) =>
    editor.isActive('textStyle', { color }))
})

const activeHighlightItem = computed(() => {
  return HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive('highlight', { color }),
  )
})

function onTextSelect(item) {
  item.name === 'Default'
    ? editor.chain().focus().unsetColor().run()
    : editor.chain().focus().setColor(item.color).run()
}

function onBackgroundSelect(item) {
  editor.chain().focus().toggleHighlight({ color: item.color }).run()
}
</script>

<template>
  <Popover>
    <PopoverTrigger>
      <Button size="sm" gap-2 rounded-none variant="ghost">
        <span
          rounded-sm px-2 py-1
          :style="{
            color: activeColorItem?.color,
            backgroundColor: activeHighlightItem?.color,
          }"
        >
          A
        </span>
        <ChevronDown h-4 w-4 />
      </Button>
    </PopoverTrigger>
    <PopoverContent :side-offset="5" align="start" class="rounded-lg p-0">
      <Command class="rounded-lg">
        <CommandList>
          <CommandGroup heading="Color">
            <CommandItem
              v-for="(item) in TEXT_COLORS"
              :key="item.name"
              :value="item.name"
              flex
              cursor-pointer
              items-center justify-between px-2 py-1 text-sm hover:bg-accent @click="onTextSelect(item)"
            >
              <div flex items-center gap-2>
                <div :style="{ color: item.color }" border rounded-lg px-2 py-px font-medium>
                  A
                </div>
                <span>{{ item.name }}</span>
              </div>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Background">
            <CommandItem
              v-for="item in HIGHLIGHT_COLORS"
              :key="item.name"
              :value="item.name"
              cursor-pointer
              @click="onBackgroundSelect(item)"
            >
              <div flex items-center gap-2>
                <div :style="{ backgroundColor: item.color }" border rounded-lg px-2 py-px font-medium>
                  A
                </div>
                <span>{{ item.name }}</span>
              </div>
              <CommandShortcut v-if="editor.isActive('highlight', { color: item.color })">
                <Check h-4 w-4 />
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
