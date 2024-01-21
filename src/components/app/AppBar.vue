<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const title = computed(() => {
  return route.meta.title
})
</script>

<template>
  <v-app-bar>
    <v-app-bar-nav-icon>
      <v-icon>mdi-menu</v-icon>
    </v-app-bar-nav-icon>
    <v-app-bar-title>Matching Tool <v-icon>mdi-menu-right</v-icon> {{ title }}</v-app-bar-title>
  </v-app-bar>
</template>

<style scoped>

</style>
