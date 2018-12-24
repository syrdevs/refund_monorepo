import { DictionaryBaseML } from '@vitacore/shared-ui'
import { CommissionMember } from './CommissionMember'

export interface Commission {
  id?: string
  region?: DictionaryBaseML
  dateBegin: string
  meetingMembers: CommissionMember[]
}
