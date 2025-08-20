<script setup lang="ts">
import { computed, type Component } from 'vue';
import { type RouteLocationRaw } from 'vue-router';
import RouterNavLink from './RouterNavLink.vue';
import SimpleLink from './SimpleLink.vue';

const props = defineProps<{
  to?: RouteLocationRaw
  href?: string
}>()
// Вместо <span> должен быть <RouterLink> или <a>
// Используйте динамический компонент <component :is="...">

// const linkVariants = {
//   SimpleLink: SimpleLink,
//   RouterNavLink: RouterNavLink
// } as const

// type LinkVariantKey = keyof typeof linkVariants

const currentLinkVariant = computed<Component | null>(()=>{
  if (typeof props.href !== 'undefined') {
    console.info(props.href)
    return SimpleLink
  }
  if (typeof props.to !== 'undefined') {
    console.info(props.to)
    return RouterNavLink
  }
  return null

})
</script>

<template>
  <component :is="currentLinkVariant" v-if="currentLinkVariant" :to="to" :href="href">
    <slot />
  </component>
</template>

<style scoped>
.link {
  color: var(--color-text-primary);
}

.link:hover {
  text-decoration: underline;
}
</style>
