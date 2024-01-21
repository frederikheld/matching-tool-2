<script setup lang="ts">
import { ElectronicComponent, getComponentName, capitalize } from '@/store/components'

import imgResistor from "@/assets/img/components/resistor.webp"
import imgCapacitor from "@/assets/img/components/capacitor.jpg"
import imgInductor from "@/assets/img/components/inductor.jpg"

const imgMap : { [type: string]: string } = {
  resistor: imgResistor,
  capacitor: imgCapacitor,
  inductor: imgInductor 
}

interface ComponentProps {
  component: ElectronicComponent | undefined
}

const props = defineProps<ComponentProps>()

const emit = defineEmits<{
  (e: 'component-selected', componentId: string): void
}>()
</script>

<template>
  <v-container class="pa-0" v-if="props.component">
    <v-row>
      <v-col>
        <h2>{{ getComponentName(props.component) }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-table class="mt-4" style="background-color: transparent;">
          <tr>
            <td>ID:</td>
            <td>{{ props.component.id }}</td>
          </tr>
          <tr>
            <td>Typ:</td>
            <td>{{ capitalize(props.component.type) }}</td>
          </tr>
          <tr>
            <td>Gehäuse:</td>
            <td>{{ props.component.housing }}</td>
          </tr>
          <tr>
            <td>Abmessungen (L x B x H x ⌀):</td>
            <td>{{ props.component.length || '-' }} x {{ props.component.width || '-' }} x {{ props.component.height || '-' }} x {{ props.component.diameter || '-' }}</td>
          </tr>
          <tr>
            <td>Masse:</td>
            <td>{{ props.component.mass }} {{ props.component.massUnit }}</td>
          </tr>
          <tr>
            <td>Referenzbauteil:</td>
            <td><a @click="emit('component-selected', props.component.id)" class="reference-link">{{ props.component.referenceComponent }}</a></td>
          </tr>
        </v-table>
      </v-col>
      <v-col cols="4">
        <v-img :src="imgMap[props.component.type]" max-height="160" />
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else class="pa-0">
    <v-row align-content="center">
      <v-col class="text-center">
        <span>Wähle eine Komponente aus um deren Details zu sehen.</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.reference-link {
  cursor: pointer;
}

.reference-link:hover {
  text-decoration: underline;
}
</style>