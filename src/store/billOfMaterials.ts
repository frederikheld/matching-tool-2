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
  { key: 'name', title: 'Name', minWidth: '120px'  },
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
  
  billOfMaterials.value = JSON.parse(`[
    {
      "id": "r-000003",
      "type": "resistor",
      "housing": "MMB",
      "length": 3.6,
      "diameter": 1.4,
      "mass": 19,
      "massUnit": "mg",
      "inGabiDB": true,
      "count": 40
    },
    {
      "id": "r-000005",
      "type": "resistor",
      "housing": "MMB",
      "length": 4,
      "diameter": 1.4,
      "mass": 23,
      "massUnit": "mg",
      "inGabiDB": false,
      "referenceComponent": "r-000003",
      "scalingFactor": 1.4,
      "count": 20
    },
    {
      "id": "ic-000005",
      "type": "capacitor",
      "housing": "FD",
      "width": 10,
      "length": 12,
      "height": 6,
      "mass": 490,
      "massUnit": "mg",
      "inGabiDB": false,
      "referenceComponent": "ic-000000",
      "scalingFactor": 1.73,
      "count": 20
    },
    {
      "id": "ic-000003",
      "type": "capacitor",
      "housing": "FD",
      "width": 10,
      "length": 12,
      "height": 6,
      "mass": 412,
      "massUnit": "mg",
      "inGabiDB": false,
      "referenceComponent": "ic-000000",
      "scalingFactor": 1.26,
      "count": 20
    },
    {
      "id": "i-000000",
      "type": "inductor",
      "housing": "5x5",
      "mass": 400,
      "massUnit": "mg",
      "inGabiDB": true,
      "count": 20
    },
    {
      "id": "i-000005",
      "type": "inductor",
      "housing": "5x5",
      "mass": 450,
      "massUnit": "mg",
      "inGabiDB": false,
      "referenceComponent": "i-000000",
      "scalingFactor": 1.3,
      "count": 30
    },
    {
      "id": "i-000004",
      "type": "inductor",
      "housing": "5x5",
      "mass": 440,
      "massUnit": "mg",
      "inGabiDB": false,
      "referenceComponent": "i-000000",
      "scalingFactor": 1.25,
      "count": 30
    },
    {
      "id": "i-000008",
      "type": "inductor",
      "housing": "8x10",
      "mass": 882,
      "massUnit": "mg",
      "inGabiDB": false,
      "referenceComponent": "i-000006",
      "scalingFactor": 2.6,
      "count": 20
    },
    {
      "id": "i-000001",
      "type": "inductor",
      "housing": "5x5",
      "mass": 410,
      "massUnit": "mg",
      "inGabiDB": false,
      "referenceComponent": "i-000000",
      "scalingFactor": 1.1,
      "count": 20
    },
    {
      "id": "i-000003",
      "type": "inductor",
      "housing": "5x5",
      "mass": 430,
      "massUnit": "mg",
      "inGabiDB": false,
      "referenceComponent": "i-000000",
      "scalingFactor": 1.2,
      "count": 30
    },
    {
      "id": "r-000008",
      "type": "resistor",
      "housing": "MMC",
      "length": 4,
      "diameter": 1.4,
      "mass": 23,
      "massUnit": "mg",
      "inGabiDB": false,
      "referenceComponent": "r-000006",
      "scalingFactor": 1.4,
      "count": 30
    }
  ]`)

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
        count: component.count,
        id: component.id,
        name: getComponentName(component),
        referenceComponent: component.referenceComponent,
        scalingFactor: component.scalingFactor
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
