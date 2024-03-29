<script setup lang="ts">
import { computed, ref } from 'vue'

import { useComponentsStore, getComponentName } from '@/store/components'
import type { ElectronicComponent, ElectronicComponentId } from '@/store/components'

import SelectedComponent from './SelectedComponent.vue'

import { useBillOfMaterialsStore, billOfMaterialsHeaderCompact } from '@/store/billOfMaterials'

const componentsStore = useComponentsStore()

const bomStore = useBillOfMaterialsStore()

const bottomSheetClosedHeight = '72px'
const bottomSheetOpenHeight = '40%'
const bottomSheetIsOpen = ref<boolean>(true)
const bottomSheetHeight = ref<string>(bottomSheetClosedHeight)

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
  <v-container style="margin-bottom: 144px;">
    <v-row>
      <v-col>
        <SelectedComponent :component="selectedComponent" @component-selected="(componentId: string) => selectComponent(componentId)" compact />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-container class="pa-0">
          <v-row class="text-center d-flex flex-row justify-space-between pa-2">
            <v-col class="flex-grow-0 pa-1">
              <v-btn color="primary" size="small" :disabled="!selectedComponent" @click="bomStore.addToBillOfMaterials(selectedComponent, 1)">
                <v-icon>mdi-plus</v-icon>1
              </v-btn>
            </v-col>
            <v-col class="flex-grow-0 pa-1">
              <v-btn dense color="primary" size="small" :disabled="!selectedComponent" @click="bomStore.addToBillOfMaterials(selectedComponent, 10)">
                <v-icon>mdi-plus</v-icon>10
              </v-btn>
            </v-col>
            <v-col class="flex-grow-0 pa-1">
              <v-btn color="primary" size="small" :disabled="!selectedComponent" @click="bomStore.removeFromBillOfMaterials(selectedComponent, 1)">
                <v-icon>mdi-minus</v-icon>1
              </v-btn>
            </v-col>
            <v-col class="flex-grow-0 pa-1">
              <v-btn color="primary" size="small" :disabled="!selectedComponent" @click="bomStore.removeFromBillOfMaterials(selectedComponent, 10)">
                <v-icon>mdi-minus</v-icon>10
              </v-btn>
            </v-col>
            <v-col class="flex-grow-0 pa-1">
              <v-btn color="warning" size="small" :disabled="!selectedComponent" @click="bomStore.removeFromBillOfMaterials(selectedComponent)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <v-row class="pa-0">
      <v-col v-if="bomStore.formattedBillOfMaterials.length > 0" class="px-0">
        <v-data-table
          :items="bomStore.formattedBillOfMaterials"
          items-per-page="-1"
          density="comfortable"
          fixed-header
          :row-props="(data) => {
            return {
              class: [data.item.id === selectedComponent?.id && 'selected']
            }
          }"
          :headers="billOfMaterialsHeaderCompact"
          @click:row="(event: Event, row: any) => selectComponent(row.item.id)"
        />
      </v-col>
      <v-col v-else class="text-center my-12">
        <div>Die Stückliste ist leer</div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn
          color="secondary"
          block
          :disabled="bomStore.formattedBillOfMaterials.length < 1"
        >
          <v-icon>mdi-export</v-icon>Export
        </v-btn>
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
    retain-focus
  >
    <v-card>
      <v-card-title @click="bottomSheetHeight = bottomSheetOpenHeight">
        <v-text-field
          v-model="query"
          label="Katalog durchsuchen ..."
          clearable
          hide-details
        />
      </v-card-title>
      <v-card-text class="pa-0">
        <v-list density="compact" style="background-color: transparent;">
          <v-list-item v-for="component in searchResults" :key="component.id" @click="selectedComponent = component" :active="selectedComponent?.id === component.id">
            <template #prepend>
              <v-icon v-if="component.inGabiDB">mdi-star-four-points-small</v-icon>
              <v-icon v-else></v-icon>
            </template>

            <!-- <template #append v-if="selectedComponent?.id === component.id">
              <v-icon>mdi-menu-right</v-icon>
            </template> -->
            {{ getComponentName(component) }}
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<style scoped>
:deep(.v-btn) {
  padding: 0;
}
</style>
