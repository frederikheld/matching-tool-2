<script setup lang="ts">
import { computed, ref } from 'vue'

import { useComponentsStore } from '@/store/components'
import type { ElectronicComponent, ElectronicComponentId } from '@/store/components'

import SelectedComponent from './SelectedComponent.vue'

import { useBillOfMaterials } from './billOfMaterials'

// const props = defineProps<{
//   selectComponent: ElectronicComponent
// }>()

const {
  formattedBillOfMaterials
} = useBillOfMaterials() 

const bottomSheetIsOpen = ref<boolean>(false)

const componentsStore = useComponentsStore()

const query = ref<string>()

const searchResults = computed(() => {
  return componentsStore.filterItems(query.value)
})

const selectedComponent = ref<ElectronicComponent>()

function selectComponent (componentId: ElectronicComponentId) : any {
  selectedComponent.value = componentsStore.getComponentById(componentId)
}
</script>

<template>

  <v-container>
    <v-row>
      <v-col>
        <SelectedComponent :component="selectedComponent" @component-selected="(componentId: string) => selectComponent(componentId)" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :items="formattedBillOfMaterials"
          items-per-page="-1"
          density="comfortable"
          fixed-header
          :row-props="(data) => {
            return {
              class: [data.item.id === selectedComponent?.id && 'selected']
            }
          }"
          @click:row="(event: Event, row: any) => selectComponent(row.item.id)"
        />
      </v-col>
    </v-row>
  </v-container>

  <v-bottom-sheet v-model="bottomSheetIsOpen">
    <v-card>
      <v-card-title>
          <v-text-field
          v-model="query"
          label="Katalog durchsuchen ..."
          clearable
          hide-details
        />
      </v-card-title>
    </v-card>
  </v-bottom-sheet>  
</template>

<style scoped>

</style>
