import { DictionaryBaseML, DictionaryBaseMLWithShortName, Identifiable } from '@vitacore/shared-ui'
import { Activity } from './Activity'
import { ClinicPick } from './Organization'
import { PeriodYearPick } from './PeriodYear'

export interface ProposalItemValue extends Identifiable {
  measureUnit: DictionaryBaseML
  value: number
}

export interface ProposalItem extends Identifiable {
  activity: Activity
  proposalItemValues: ProposalItemValue[]
}

export interface Proposal extends Identifiable {
  number?: string
  descr?: string
  documentDate?: string
  proposalItems: ProposalItem[]
  periodYear?: PeriodYearPick
  clinic?: ClinicPick
  region?: DictionaryBaseML
  proposalType?: DictionaryBaseMLWithShortName
}

export type ProposalForList = Pick<
  Proposal,
  'id' | 'number' | 'descr' | 'documentDate' | 'periodYear' | 'clinic' | 'region' | 'proposalType'
>
