<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

import NavigationDrawer from '@/components/app/NavigationDrawer.vue'
import AppBar from '@/components/app/AppBar.vue'

const { mdAndUp, smAndUp } = useDisplay()

const navDrawerIsOpen = ref<boolean>(mdAndUp.value)
</script>

<template>
  <v-app>
    <AppBar @toggle-nav-drawer="navDrawerIsOpen = !navDrawerIsOpen" />

    <NavigationDrawer v-model="navDrawerIsOpen" />

    <v-main :style="( mdAndUp ? 'height: 100dvh;' : 'height: 100dvh; overflow-y: scroll; margin-bottom: -72px;')">
      <RouterView />
    </v-main>
  </v-app>
</template>

<style>
body {
  overflow-y: hidden;
}
</style>
