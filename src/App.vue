<script setup lang="ts">
import NavigationDrawer from '@/components/app/NavigationDrawer.vue'
</script>

<template>
  <v-app>
    <v-app-bar absolute>
      <v-app-bar-nav-icon>
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>
      <v-app-bar-title>Matching Tool</v-app-bar-title>
    </v-app-bar>

    <NavigationDrawer />

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
