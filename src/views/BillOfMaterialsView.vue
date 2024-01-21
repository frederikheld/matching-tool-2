<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useComponentsStore, getComponentName, capitalize, type ElectronicComponent } from '@/store/components'

import imgResistor from "@/assets/img/components/resistor.webp"
import imgCapacitor from "@/assets/img/components/capacitor.jpg"
import imgInductor from "@/assets/img/components/inductor.jpg"

const imgMap : { [type: string]: string } = {
  resistor: imgResistor,
  capacitor: imgCapacitor,
  inductor: imgInductor 
}

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
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-text-field v-model="query" label="Katalog durchsuchen ..." clearable></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-list density="compact">
          <v-list-item v-for="component in searchResults" :key="component.id" @click="selectedComponent = component" :active="selectedComponent?.id === component.id" :append-icon="(selectedComponent?.id === component.id ? 'mdi-menu-right' : undefined)">
            <template #prepend style="width: 36px !important;">
              <v-icon v-if="component.inGabiDB">mdi-star-four-points-small</v-icon>
              <v-icon v-else></v-icon>
            </template>
            {{ getComponentName(component) }}
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="8">
        <v-row v-if="selectedComponent">
          <v-col cols="8">
            <h2>{{ getComponentName(selectedComponent) }}</h2>
            <v-table class="mt-4">
              <tr>
                <td>Typ:</td>
                <td>{{ capitalize(selectedComponent.type) }}</td>
              </tr>
              <tr>
                <td>Gehäuse:</td>
                <td>{{ selectedComponent.housing }}</td>
              </tr>
              <tr>
                <td>Abmessungen (L x B x H x ⌀):</td>
                <td>{{ selectedComponent.length || '-' }} x {{ selectedComponent.width || '-' }} x {{ selectedComponent.height || '-' }} x {{ selectedComponent.diameter || '-' }}</td>
              </tr>
              <tr>
                <td>Masse:</td>
                <td>{{ selectedComponent.mass }} {{ selectedComponent.massUnit }}</td>
              </tr>
              <tr>
                <td>Referenzbauteil:</td>
                <td><a @click="selectedComponent = componentsStore.getComponentById(selectedComponent.referenceComponent)">{{ selectedComponent.referenceComponent }}</a></td>
              </tr>
            </v-table>
          </v-col>
          <v-col cols="4">
            <v-img :src="imgMap[selectedComponent.type]" max-height="160" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="addToBillOfMaterials(selectedComponent, 1)">+ 1</v-btn>
            <v-btn class="ml-2" @click="addToBillOfMaterials(selectedComponent, 10)">+ 10</v-btn>
            <v-btn class="ml-2" @click="removeFromBillOfMaterials(selectedComponent, 1)">- 1</v-btn>
            <v-btn class="ml-2" @click="removeFromBillOfMaterials(selectedComponent, 10)">- 10</v-btn>
            <v-btn class="ml-2" @click="removeFromBillOfMaterials(selectedComponent)">remove</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table :items="billOfMaterials" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
