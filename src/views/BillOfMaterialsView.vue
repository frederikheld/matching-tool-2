<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'

import { useBillOfMaterials } from './BillOfMaterials/billOfMaterials'

import { useComponentsStore, getComponentName } from '@/store/components'
import type { ElectronicComponent, ElectronicComponentId } from '@/store/components'

import LayoutMobile from './BillOfMaterials/LayoutMobile.vue'
import LayoutDesktop from './BillOfMaterials/LayoutDesktop.vue'

const componentsStore = useComponentsStore()

const { smAndDown } = useDisplay()

const {
  billOfMaterialsHeader,
  addToBillOfMaterials,
  formattedBillOfMaterials,
  removeFromBillOfMaterials
} = useBillOfMaterials()

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
  <!-- MOBILE LAYOUT -->
  <div v-if="smAndDown">
    <LayoutMobile />
  </div>

  <!-- DESKTOP LAYOUT -->
  <div v-else>
    <LayoutDesktop />
  </div>

</template>

<style scoped>
:deep(.v-data-table-footer) {
  display: none;
}

:deep(.v-table__wrapper > table > tbody > tr:hover) {
  background-color: rgba(0, 0, 0, 0.03);
}

:deep(.v-table__wrapper > table > tbody > tr.selected) {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
