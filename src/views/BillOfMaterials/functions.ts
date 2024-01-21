import type { Ref } from 'vue'
import type { ElectronicComponent } from '@/store/components'

export type BillOfMaterialsItem = (ElectronicComponent & { count: number })

export function addToBillOfMaterials (billOfMaterials: Ref<BillOfMaterialsItem[]>, component?: ElectronicComponent, count?: number) : void {
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
