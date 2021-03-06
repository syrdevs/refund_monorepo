import { DictionaryBaseML } from '@vitacore/shared-ui'
import { Moment } from 'moment'
import { Organization } from '../../../Entities/Organization'
import { PeriodYearPick } from '../../../Entities/PeriodYear'

export type EntityProps = {
  id: { value?: string }
  number: { value?: string }
  descr: { value?: string }
  documentDate: { value?: Moment }
  periodYear: { value?: PeriodYearPick }
  clinic: { value?: Organization }
  region: { value?: DictionaryBaseML }
  proposalType: { value?: DictionaryBaseML }
}
