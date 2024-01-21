<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useComponentsStore, getComponentName, capitalize, type ElectronicComponent } from '@/store/components'

import SelectedComponent from './BillOfMaterials/SelectedComponent.vue'

const componentsStore = useComponentsStore()

const query = ref<string>()

const searchResults = computed(() => {
  return componentsStore.filterItems(query.value)
})

const selectedComponent = ref<ElectronicComponent>()

type billOfMaterialsItem = (ElectronicComponent & { count: number })

const billOfMaterials = ref<billOfMaterialsItem[]>([])

function addToBillOfMaterials (component?: ElectronicComponent, count?: number) : void {
  if (component) {
    const existingEntry: billOfMaterialsItem | undefined = billOfMaterials.value.find((entry) => entry.id === component.id)

    if (count) {
      if (existingEntry) {
        existingEntry.count = existingEntry.count + count
      } else {
        billOfMaterials.value.push({
          ...component,
          count
        })
      }
    }
  }
}

/**
 * Will remove the given count of the given component from the bill of materials.
 * If the remaining amount is 0 or below, the component will be removed from the list.
 * If count is not given, the component will be removed from the list as well.
 */
function removeFromBillOfMaterials (component?: ElectronicComponent, count?: number) : void {
  if (component) {
    const existingEntry: billOfMaterialsItem | undefined = billOfMaterials.value.find((entry) => entry.id === component.id)

    if (existingEntry) {

      if (count) {
        existingEntry.count = existingEntry.count - count

        if (existingEntry.count <= 0) {
          const existingEntryIndex = billOfMaterials.value.findIndex((entry) => entry.id === component.id)
          billOfMaterials.value.splice(existingEntryIndex, 1)
        }
      } else {
        const existingEntryIndex = billOfMaterials.value.findIndex((entry) => entry.id === component.id)
        billOfMaterials.value.splice(existingEntryIndex, 1)
      }
    }
  }
}

const formattedBillOfMaterials = computed(() => {
  return billOfMaterials.value.map((component) => {
    return {
      id: component.id,
      name: getComponentName(component),
      referenceComponent: component.referenceComponent,
      scalingFactor: component.scalingFactor,
      count: component.count
    }
  })
})
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
      <v-col class="d-flex flex-column pa-0" style="max-width: 350px; max-height: calc(100vh - 64px - 81px);">
        <div class="d-flex flex-column flex-grow-1" style="overflow-y: hidden;">
          <v-list density="compact">
            <v-list-item v-for="component in searchResults" :key="component.id" @click="selectedComponent = component" :active="selectedComponent?.id === component.id" :append-icon="(selectedComponent?.id === component.id ? 'mdi-menu-right' : undefined)">
              <template #prepend style="width: 36px !important;">
                <v-icon v-if="component.inGabiDB">mdi-star-four-points-small</v-icon>
                <v-icon v-else></v-icon>
              </template>
              {{ getComponentName(component) }}
            </v-list-item>
          </v-list>
        </div>
      </v-col>
      <v-col class="d-flex flex-column">
        <v-row class="flex-grow-0" style="min-height: 250px;">
          <v-col>
            <SelectedComponent :component="selectedComponent" @component-selected="(componentId: string) => selectedComponent = componentsStore.getComponentById(componentId)" />
          </v-col>
        </v-row>
        <v-row class="flex-grow-0">
          <v-col class="text-center">
            <v-card elevation="0" style="background-color: rgba(0, 0, 0, 0.05);">
              <v-card-text>
                <v-btn @click="addToBillOfMaterials(selectedComponent, 1)">+ 1</v-btn>
                <v-btn class="ml-2" @click="addToBillOfMaterials(selectedComponent, 10)">+ 10</v-btn>
                <v-btn class="ml-2" @click="removeFromBillOfMaterials(selectedComponent, 1)">- 1</v-btn>
                <v-btn class="ml-2" @click="removeFromBillOfMaterials(selectedComponent, 10)">- 10</v-btn>
                <v-btn class="ml-2" @click="removeFromBillOfMaterials(selectedComponent)">remove</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="d-flex flex-column">
          <v-col v-if="formattedBillOfMaterials.length > 0" class="flex-grow-1 pa-0" style="overflow-y: scroll">
            <v-data-table
              :items="formattedBillOfMaterials"
              items-per-page="-1"
              density="comfortable"
              fixed-header
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
:deep(.v-data-table-footer) {
  display: none;
}
</style>
