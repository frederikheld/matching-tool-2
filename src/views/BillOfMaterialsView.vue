<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useComponentsStore, getComponentName } from '@/store/components'

const componentsStore = useComponentsStore()

const query = ref<string>()

const searchResults = computed(() => {
  return componentsStore.filterItems(query.value)
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field v-model="query" label="Katalog durchsuchen ..." clearable></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list density="compact">
          <v-list-item v-for="component in searchResults" :key="component.id">
            {{ getComponentName(component) }}
          </v-list-item>
        </v-list>
      </v-col>
      <v-col>
        Right side
      </v-col>
    </v-row>
  </v-container>
</template>
