<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'

import { useComponentsStore, getComponentName } from '@/store/components'
import type { ElectronicComponent, ElectronicComponentId } from '@/store/components'
import { useBillOfMaterialsStore, billOfMaterialsHeader } from '@/store/billOfMaterials'

import SelectedComponent from './SelectedComponent.vue'

const componentsStore = useComponentsStore()
const bomStore = useBillOfMaterialsStore() 

const { lgAndUp } = useDisplay()

const query = ref<string>()

const searchResults = computed(() => {
  return componentsStore.filterItems(query.value)
})

const selectedComponent = ref<ElectronicComponent>()

function selectComponent (componentId: ElectronicComponentId) : any {
  selectedComponent.value = componentsStore.getComponentById(componentId)
}

function exportBillOfMaterials () : void {
  console.log(JSON.stringify(bomStore.billOfMaterials, undefined, 2))
}
</script>

<template>
  <v-container fluid class="d-flex flex-column pa-3" style="height: calc(100vh - 64px);">
    <v-row class="flex-0-0">
      <v-col>
        <v-text-field
          v-model="query"
          label="Katalog durchsuchen ..."
          clearable
          hide-details
        />
      </v-col>
    </v-row>
    <v-row class="d-flex flex-row">
      <v-col class="d-flex flex-column pa-0" style="max-width: 380px; max-height: calc(100vh - 64px - 81px);">
        <div class="d-flex flex-column flex-grow-1" style="overflow-y: hidden;">
          <v-list density="compact">
            <v-list-item v-for="component in searchResults" :key="component.id" @click="selectedComponent = component" :active="selectedComponent?.id === component.id">
              <template #prepend style="width: 36px !important;">
                <v-icon v-if="component.inGabiDB">mdi-star-four-points-small</v-icon>
                <v-icon v-else></v-icon>
              </template>

              <!-- <template #append v-if="selectedComponent?.id === component.id">
                <v-icon>mdi-menu-right</v-icon>
              </template> -->
              {{ getComponentName(component) }}
            </v-list-item>
          </v-list>
        </div>
      </v-col>
      <v-col class="d-flex flex-column">
        <v-row class="flex-grow-0" style="min-height: 250px;">
          <v-col>
            <SelectedComponent :component="selectedComponent" @component-selected="(componentId) => selectComponent(componentId)" />
          </v-col>
        </v-row>
        <v-row class="flex-grow-0">
          <v-col>
            <v-card elevation="0" style="background-color: rgba(0, 0, 0, 0.03);">
              <v-card-text>
                <v-container class="pa-0">
                  <v-row>
                    <v-col v-if="lgAndUp" cols="2"></v-col>
                    <v-col cols="10" lg="8" class="text-left text-lg-center">
                      <v-btn color="primary" :disabled="!selectedComponent" @click="bomStore.addToBillOfMaterials(selectedComponent, 1)"><v-icon>mdi-plus</v-icon>1</v-btn>
                      <v-btn color="primary" :disabled="!selectedComponent" class="ml-2" @click="bomStore.addToBillOfMaterials(selectedComponent, 10)"><v-icon>mdi-plus</v-icon>10</v-btn>
                      <v-btn color="primary" :disabled="!selectedComponent" class="ml-2" @click="bomStore.removeFromBillOfMaterials(selectedComponent, 1)"><v-icon>mdi-minus</v-icon>1</v-btn>
                      <v-btn color="primary" :disabled="!selectedComponent" class="ml-2" @click="bomStore.removeFromBillOfMaterials(selectedComponent, 10)"><v-icon>mdi-minus</v-icon>10</v-btn>
                      <v-btn color="warning" :disabled="!selectedComponent" class="ml-2" @click="bomStore.removeFromBillOfMaterials(selectedComponent)"><v-icon>mdi-delete</v-icon></v-btn>
                    </v-col>
                    <v-col cols="2" class="text-right">
                      <v-btn color="secondary" @click="exportBillOfMaterials"><v-icon>mdi-export</v-icon></v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="d-flex flex-column">
          <v-col v-if="bomStore.formattedBillOfMaterials.length > 0" class="flex-grow-1 pa-0" style="overflow-y: scroll">
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
              :headers="billOfMaterialsHeader"
              @click:row="(event: Event, row: any) => selectComponent(row.item.id)"
            />
          </v-col>
          <v-col v-else class="text-center">
            <div>Die Stückliste ist leer</div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
