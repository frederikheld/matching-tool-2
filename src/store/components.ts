import { defineStore } from 'pinia'

import capacitors from './components/capacitors.json'

/**
 * PUBLIC TYPES AND INTERFACES
 */

export type ElectronicComponentId = string
export type ElectronicComponentType = 'capacitor' | 'resistor' | 'induction' | 'diode' | 'FET' | 'IC'
export type ElectronicComponentHousing = 'Big Case' | 'Small Case' | 'FD' | 'CD' | 'UD' | 'UE'
export type ElectronicComponentMassUnit = 'g' | 'mg'

export interface ElectronicComponent {
  id: ElectronicComponentId,
  // name: string,
  type: ElectronicComponentType,
  housing: ElectronicComponentHousing,
  width?: number,
  length?: number,
  height?: number
  diameter?: number,
  mass?: number,
  massUnit?: ElectronicComponentMassUnit,
  referenceComponent?: ElectronicComponentId,
  scalingFactor?: number,
  inGabiDB: boolean
}

/**
 * PUBLIC FUNCTIONS
 */

export function getComponentName (component: ElectronicComponent): string {
  return capitalize(component.type) +
  ' ' + capitalize(component.housing) +
  ' ' + component.mass + component.massUnit + 
  ' ' + component.length + 'x' + component.width + 'x' + component.height
}

/**
 * PRIVATE FUNCTIONS
 */

function capitalize (string: string) : string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * STORE
 */

export const useComponentsStore = defineStore('components', () : any => {

  const components: ElectronicComponent[] = [
    ...(capacitors as ElectronicComponent[])
  ]

  function filterItems (query: string | undefined): ElectronicComponent[] {
    if (!query) {
      return components
    }

    const regex = new RegExp(query, "i")

    const filteredComponents = components.map((item) : { id: string, name: string } => { return { id: item.id, name: getComponentName(item) } }).filter(item => item.name.match(regex))

    const result : ElectronicComponent[] = []
    filteredComponents.forEach(component => {
      const match = components.find(item => item.id === component.id)
      if (match) result.push(match)
    })

    return result
  }

  return {
    components,
    filterItems
  }
})
