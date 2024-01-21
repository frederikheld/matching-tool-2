import { defineStore } from 'pinia'

import capacitors from './components/capacitors.json'
import resistors from './components/resistors.json'
import inductors from './components/inductors.json'

/**
 * PUBLIC TYPES AND INTERFACES
 */

export type ElectronicComponentId = string
export type ElectronicComponentType = 'capacitor' | 'resistor' | 'induction' | 'diode' | 'FET' | 'IC'
export type ElectronicComponentHousing = 'Big Case' | 'Small Case' | 'FD' | 'CD' | 'UD' | 'UE' | 'MMA' | 'MMB' | 'MMU' | '5x5' | '8x10' | '8x6'
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
  (component.mass ? ' ' + component.mass + component.massUnit : '') + 
  (component.length && component.width && component.height ?
    ' ' + component.length + 'x' + component.width + 'x' + component.height + ' ' :
    ''
  ) +
  (component.length && component.diameter ? 
    ' ' + component.length + 'x' + component.diameter + ' '
    : ''
  )
}

export function capitalize (string: string) : string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * STORE
 */

export const useComponentsStore = defineStore('components', () : any => {

  const components: ElectronicComponent[] = [
    ...(capacitors as ElectronicComponent[]),
    ...(resistors as ElectronicComponent[]),
    ...(inductors as ElectronicComponent[])
  ]

  function filterItems (query: string | undefined): ElectronicComponent[] {
    if (!query) {
      return components
    }

    const queryParts : string[] = query.split(' ')

    const matchingComponents = components.map((item) : { id: string, name: string } => { return { id: item.id, name: getComponentName(item) } }).filter((item) => {
      const regex = new RegExp(queryParts.join('.*'), 'i')

      return item.name.match(regex)
    })

    const result : ElectronicComponent[] = []
    matchingComponents.forEach(component => {
      const match = components.find(item => item.id === component.id)
      if (match) result.push(match)
    })

    return result
  }

  function getComponentById (componentId: ElectronicComponentId) : ElectronicComponent | undefined {
    return components.find(item => item.id === componentId)
  }

  return {
    components,
    filterItems,
    getComponentById
  }
})
