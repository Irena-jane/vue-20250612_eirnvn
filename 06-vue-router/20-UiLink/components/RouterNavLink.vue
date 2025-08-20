<script setup lang="ts">
import { type Slot } from 'vue';
import { RouterLink, type RouteLocationRaw } from "vue-router";

  defineProps<{
    to: RouteLocationRaw
  }>()

  defineSlots<{
    default?: Slot
  }>()
</script>
<template>
  <RouterLink :to="to" class="link" tabindex="0">
    <slot />
  </RouterLink>
</template>
