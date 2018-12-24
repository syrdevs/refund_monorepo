import DictionaryType from '../Models/DictionaryType'

type dictionariesNames =
  | 'medicalForm'
  | 'medicalType'
  | 'region'
  | 'noticeType'
  | 'sex'
  | 'meetingMemberRole'
  | 'periodYear'
  | 'measureUnit'
  | 'proposalType'
  | 'attachmentType'
const dictionariesList: DictionaryType[] = [
  {
    name: 'medicalForm',
  },
  {
    name: 'medicalType',
  },
  {
    name: 'region',
  },
  {
    name: 'noticeType',
  },
  {
    name: 'sex',
  },
  {
    name: 'meetingMemberRole',
  },
  {
    name: 'periodYear',
  },
  {
    name: 'measureUnit',
  },
  {
    name: 'proposalType',
  },
  {
    name: 'attachmentType',
  },
]

export { dictionariesNames, dictionariesList }
