<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  command: {
    type: Function,
    required: true,
  },
})
const selectedIndex = ref(0)

watch(() => props.items, () => {
  selectedIndex.value = 0
})

function onKeyDown({ event }) {
  if (event.key === 'ArrowUp') {
    upHandler()
    return true
  }

  if (event.key === 'ArrowDown') {
    downHandler()
    return true
  }

  if (event.key === 'Enter') {
    enterHandler()
    return true
  }

  return false
}

function upHandler() {
  selectedIndex.value
        = (selectedIndex.value + props.items.length - 1) % props.items.length
}

function downHandler() {
  selectedIndex.value = (selectedIndex.value + 1) % props.items.length
}

function enterHandler() {
  selectItem(selectedIndex.value)
}

function selectItem(index) {
  const item = props.items[index]
  if (item)
    props.command(item)
}

defineExpose({ onKeyDown })
</script>

<template>
  <Command class="w-[350px] border rounded-lg shadow-md">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup>
        <CommandItem
          v-for="(item, index) in items"
          :key="item.title"
          :value="item.title"
          :class="{ 'is-selected': index === selectedIndex }"
          @click="selectItem(index)"
        >
          <component
            :is="item.icon"
            v-if="item.icon"
            :size="4"
            class="mr-2"
          />
          <span>{{ item.title }}</span>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>

<style scoped>
.is-selected {
  border-color: #000;
}
</style>
