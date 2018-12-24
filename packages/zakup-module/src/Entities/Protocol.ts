import { DictionaryBaseML, DictionaryBaseMLWithShortName, Identifiable } from '@vitacore/shared-ui'
import { Activity } from './Activity'
import { Clinic } from './Clinic'
import { PeriodYearPick } from './PeriodYear'
import { DocumentStatus } from './DocumentStatus'

export interface ProtocolItemValue extends Identifiable {
  value: number
  valueSum: number | null
  proposalItemValue: {
    value: number
    valueSum: number | null
  }
  measureUnit: DictionaryBaseMLWithShortName
}

export interface ProtocolItem extends Identifiable {
  activity: Activity
  clinic: Clinic
  planProtocolItemValues: ProtocolItemValue[]
}

export interface MeasureUnitInfo {
  measureUnit: DictionaryBaseMLWithShortName
  value: number
  initialValue: number
  planItemValue: number
  proposalValue: number
  valueSum: number | null
}

export interface InitialCellValue {
  clinicId: string
  measureUnitId: string
  value: number | null
  dirty: boolean
}

export interface ProtocolActivityGroupInfo {
  activity: Activity
  measureUnitValues: MeasureUnitInfo[]
  initialCellValues: InitialCellValue[]
}

export interface ProtocolForList extends Identifiable {
  periodYear?: PeriodYearPick
  region?: DictionaryBaseML
  planProtocolType?: DictionaryBaseML
  number?: string
  descr?: string
  documentDate?: string
  documentStatus?: DocumentStatus
}
