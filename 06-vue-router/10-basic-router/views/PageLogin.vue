<script setup lang="ts">
import { UiButton, UiFormGroup, UiInput } from '@shgk/vue-course-ui'
import { ref } from 'vue'
import MeetupsAuthForm from '../components/MeetupsAuthForm.vue'
import LayoutAuth from '../components/LayoutAuth.vue'
import { login } from '../api.ts'
import { useRoute, useRouter,  type RouteLocationNormalizedLoadedGeneric,  type RouteRecordNameGeneric} from 'vue-router'
// type LocationQueryValue, type RouteLocationAsRelativeTyped, type RouteLocationResolvedGeneric, type RouteLocationNormalizedLoaded,  type RouteRecordNameGeneric

const email = ref('demo@email')
const password = ref('password')

const router = useRouter();
const route = useRoute();

// Вариант решения проблемы с Typescript
const getFromPath = (route: RouteLocationNormalizedLoadedGeneric): string | null => {
  const from = route.query?.from
  if (typeof from === 'string') return from
  if (Array.isArray(from) && from.length > 0) return from[0] as string
  return null
}

async function onSubmit() {
  try {
    await login(email.value, password.value)
    // Авторизация прошла успешно
    console.info('ROUTE : ', route)
    // if (route.query?.from && typeof route.query.from === 'string') {
    //   router.push(route.query.from)
    // } else {
    //   router.push('/')
    // }
    const from = getFromPath(route);
    if(from){
      // const from = route.query.from as RouteRecordNameGeneric;
      const name = router.resolve(from).name as RouteRecordNameGeneric;
      // const name = resolved.name as RouteRecordNameGeneric
      // console.info('RESOLVED : ', router.resolve(route.query?.from))
      router.push({name})
    } else {
      router.push({name: 'index'})
    }
  } catch (error) {
    alert((error as Error).message)
  }
}
</script>

<template>
  <LayoutAuth title="Вход">
    <MeetupsAuthForm @submit="onSubmit">
      <UiFormGroup label="Email">
        <UiInput v-model="email" name="email" type="email" placeholder="demo@email" large required />
      </UiFormGroup>

      <UiFormGroup label="Пароль">
        <UiInput v-model="password" name="password" type="password" placeholder="password" large required />
      </UiFormGroup>

      <template #submit>
        <UiButton kind="primary" type="submit" wide size="large">Войти</UiButton>
      </template>

      <template #append>
        Нет аккаунта?
        <RouterLink :to="{name: 'register'}">Зарегистрируйтесь</RouterLink>
      </template>
    </MeetupsAuthForm>
  </LayoutAuth>
</template>
