import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { ElectronicComponent } from './components'
import { getComponentName } from './components'


/**
 * PUBLIC TYPES AND INTERFACES
 */

export type BillOfMaterialsItem = (ElectronicComponent & { count: number })


/**
 * PUBLIC CONSTANTS (NON-REACTIVE)
 */

/**
 * Use for `headers` prop on `v-data-table` in desktop layout.
 */
export const billOfMaterialsHeader = [
  { key: 'id', title: 'ID' },
  { key: 'name', title: 'Name' },
  { key: 'referenceComponent', title: 'Reference Component' },
  { key: 'scalingFactor', title: 'Scaling Factor' },
  { key: 'count', title: 'Count' }
]

/**
 * Use for `headers` prop on `v-data-table` in mobile layout.
 */
export const billOfMaterialsHeaderCompact = [
  { key: 'id', title: 'ID' },
  { key: 'name', title: 'Name' },
  { key: 'referenceComponent', title: 'Ref' },
  { key: 'scalingFactor', title: 'SF' },
  { key: 'count', title: '#' }
]


/**
 * PUBLIC FUNCTIONS
 */


/**
 * STORE
 */

export const useBillOfMaterialsStore = defineStore('billOfMaterials', () : any => {
  const billOfMaterials = ref<BillOfMaterialsItem[]>([])
  // const billOfMaterials : Ref<BillOfMaterialsItem[]> = ref([])

  /**
   * Will add the given count of the given component to the bill of materials.
   * If the component is already on the bill of materials, the count will be
   * summed up with the item that is already on the list. Other wise the
   * component will be added to the list.
   */
  function addToBillOfMaterials (component?: ElectronicComponent, count?: number) : void {
    if (component) {
      const existingEntry: BillOfMaterialsItem | undefined = billOfMaterials.value.find((entry) => entry.id === component.id)

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
      const existingEntry: BillOfMaterialsItem | undefined = billOfMaterials.value.find((entry) => entry.id === component.id)

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


  /**
   * COMPUTED PROPERTIES
   */

  const formattedBillOfMaterials = computed<{
    id: string,
    name: string,
    referenceComponent: string | undefined,
    scalingFactor: number | undefined,
    count: number
  }[]>(() => {
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

  return {
    billOfMaterials,
    formattedBillOfMaterials,
    addToBillOfMaterials,
    removeFromBillOfMaterials
  }
})
