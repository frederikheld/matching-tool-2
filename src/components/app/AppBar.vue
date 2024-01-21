<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'

const route = useRoute()
const { mdAndDown } = useDisplay()

const title = computed(() => {
  return route.meta.title
})

const emit = defineEmits(['toggle-nav-drawer'])
</script>

<template>
  <v-app-bar style="z-index: 20000;">
    <v-app-bar-nav-icon v-if="mdAndDown">
      <v-icon @click="emit('toggle-nav-drawer')">mdi-menu</v-icon>
    </v-app-bar-nav-icon>
    <v-app-bar-title>Matching Tool <v-icon>mdi-menu-right</v-icon> {{ title }}</v-app-bar-title>
  </v-app-bar>
</template>

<style scoped>

</style>
