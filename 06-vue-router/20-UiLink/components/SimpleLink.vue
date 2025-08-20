<script setup lang="ts">
import type { Slot } from 'vue';


defineProps<{
  href: string
}>()

defineSlots<{
  default?: Slot
}>()
</script>
<template>
  <a :href="href"><slot /></a>
</template>
