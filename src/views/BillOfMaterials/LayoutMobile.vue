<script setup lang="ts">
import { computed, ref } from 'vue'

import { useComponentsStore, getComponentName } from '@/store/components'
import type { ElectronicComponent, ElectronicComponentId } from '@/store/components'

import SelectedComponent from './SelectedComponent.vue'

import { useBillOfMaterials } from './billOfMaterials'

// const props = defineProps<{
//   selectComponent: ElectronicComponent
// }>()

const {
  formattedBillOfMaterials
} = useBillOfMaterials() 

const bottomSheetClosedHeight = '72px'
const bottomSheetOpenHeight = '40%'
const bottomSheetIsOpen = ref<boolean>(true)
const bottomSheetHeight = ref<string>(bottomSheetClosedHeight)

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

  <v-bottom-sheet
    v-model="bottomSheetIsOpen"
    :scrim="false"
    persistent
    :scrollable="true"
    no-click-animation
    :height="bottomSheetHeight"
    @click:outside="bottomSheetHeight = bottomSheetClosedHeight"
  >
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="query"
          label="Katalog durchsuchen ..."
          clearable
          hide-details
          @click="bottomSheetHeight = bottomSheetOpenHeight"
        />
      </v-card-title>
      <v-card-text class="pa-0">
        <v-list density="compact" style="background-color: transparent;">
            <v-list-item v-for="component in searchResults" :key="component.id" @click="selectedComponent = component" :active="selectedComponent?.id === component.id">
              <template #prepend style="width: 36px !important;">
                <v-icon v-if="component.inGabiDB">mdi-star-four-points-small</v-icon>
                <v-icon v-else></v-icon>
              </template>

              <template #append v-if="selectedComponent?.id === component.id">
                <v-icon>mdi-menu-right</v-icon>
              </template>
              {{ getComponentName(component) }}
            </v-list-item>
          </v-list>
        </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<style scoped>

</style>
