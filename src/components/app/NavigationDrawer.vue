<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits(['update:model-value'])
</script>

<template>
  <v-navigation-drawer v-model:model-value="props.modelValue" @update:model-value="(value) => emit('update:model-value', value)" @click:outside="(value: boolean) => emit('update:model-value', value)">
    <v-list class="d-flex flex-column" height="100%">
      <v-list-item
        prepend-icon="mdi-progress-check"
        to="projects"
      >
        Projekte
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-book-outline"
        to="catalog"
      >
        Katalog
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-invoice-list-outline"
        to="bom"
      >
        Stücklisten
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-list-status"
        to="protocols"
      >
        Protokolle
      </v-list-item>

      <v-spacer />

      <v-list-item
        prepend-icon="mdi-cog-outline"
        to="settings"
      >
        Einstellungen
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.v-list-item {
  flex: 0;
}
</style>
