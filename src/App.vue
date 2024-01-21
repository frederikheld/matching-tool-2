<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

import NavigationDrawer from '@/components/app/NavigationDrawer.vue'
import AppBar from '@/components/app/AppBar.vue'

const { mdAndUp } = useDisplay()

const navDrawerIsOpen = ref<boolean>(mdAndUp.value)
</script>

<template>
  <v-app>
    <AppBar @toggle-nav-drawer="navDrawerIsOpen = !navDrawerIsOpen" />

    <NavigationDrawer v-model="navDrawerIsOpen" />

    <v-main style="height: 100vh;">
      <RouterView />
    </v-main>
  </v-app>
</template>

<style>
body {
  overflow-y: hidden;
}
</style>
