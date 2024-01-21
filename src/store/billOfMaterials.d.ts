import 'pinia'

declare module 'billOfMaterials' {
  export interface PiniaCustomProperties {
    addToBillOfMaterials: Function,
    removeFromBillOfMaterials: Function
  }
}