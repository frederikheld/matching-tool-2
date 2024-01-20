<script setup lang="ts">
import NavigationDrawer from '@/components/app/NavigationDrawer.vue'
import AppBar from '@/components/app/AppBar.vue'
</script>

<template>
  <v-app>
    <AppBar />

    <NavigationDrawer />

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
