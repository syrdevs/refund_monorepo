import { DictionaryBaseML, Identifiable } from '@vitacore/shared-ui'
import { Moment } from 'moment'
import { PeriodYear } from './PeriodYear'

export interface Notice {
  id?: string
  noticeType?: DictionaryBaseML
  region?: DictionaryBaseML
  periodYear?: PeriodYear
  dateBegin: Moment
  dateEnd: Moment
  status: string
  numberOfApplications?: number
  noticeMedicalTypes: Array<
    {
      medicalType: DictionaryBaseML
    } & Identifiable
  >
  noticeMedicalForms: Array<
    {
      medicalForm: DictionaryBaseML
    } & Identifiable
  >
}
