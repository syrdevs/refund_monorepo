import { Identifiable } from '@vitacore/shared-ui'

export interface Clinic extends Identifiable {
  name: string
  shortName: string
  bin: string
}
