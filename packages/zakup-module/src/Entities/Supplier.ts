import { Moment } from 'moment'

export default interface Supplier {
  regionNum: string
  name: string
  BIN_INN?: string
  territory?: string
  isBadSupplier: boolean
}

export interface BadSupplier extends Supplier {
  reasonLink: string
  reasonLinkText: string
  includedFrom: Moment
  includedTo?: Moment
}
