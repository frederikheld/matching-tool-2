<script lang="ts" setup>
import { useDisplay } from 'vuetify'

import LayoutMobile from './BillOfMaterials/LayoutMobile.vue'
import LayoutDesktop from './BillOfMaterials/LayoutDesktop.vue'

const { smAndDown } = useDisplay()
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
