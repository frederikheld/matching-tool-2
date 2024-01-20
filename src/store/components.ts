import { defineStore } from 'pinia'

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

export const useComponentsStore = defineStore('components', () => {

  const components: ElectronicComponent[] = [
    // IC COMPONENTS:

    { id: 'ic-000000', type: 'capacitor', housing: 'FD', width: 10, length: 12, height: 6, mass: 318, massUnit: 'mg', inGabiDB: true },
    { id: 'ic-000001', type: 'capacitor', housing: 'FD', width: 10, length: 12, height: 6, mass: 335, massUnit: 'mg', inGabiDB: false, referenceComponent: 'ic-000000', scalingFactor: 1.1 },
    { id: 'ic-000002', type: 'capacitor', housing: 'FD', width: 10, length: 12, height: 6, mass: 347, massUnit: 'mg', inGabiDB: false, referenceComponent: 'ic-000000', scalingFactor: 1.21 },
    { id: 'ic-000003', type: 'capacitor', housing: 'FD', width: 10, length: 12, height: 6, mass: 412, massUnit: 'mg', inGabiDB: false, referenceComponent: 'ic-000000', scalingFactor: 1.26 },
    { id: 'ic-000004', type: 'capacitor', housing: 'FD', width: 10, length: 12, height: 6, mass: 475, massUnit: 'mg', inGabiDB: false, referenceComponent: 'ic-000000', scalingFactor: 1.7 },
    { id: 'ic-000005', type: 'capacitor', housing: 'FD', width: 10, length: 12, height: 6, mass: 490, massUnit: 'mg', inGabiDB: false, referenceComponent: 'ic-000000', scalingFactor: 1.73 }
  ]

  function filterItems (query: string | undefined): ElectronicComponent[] {
    if (!query) {
      return components
    }

    const filteredComponents = components.map((item) : { id: string, name: string } => { return { id: item.id, name: getComponentName(item) } }).filter(item => item.name.match(query))

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
