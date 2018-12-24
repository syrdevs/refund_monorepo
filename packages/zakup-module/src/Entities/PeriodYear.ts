import { Identifiable } from '@vitacore/shared-ui'

export interface PeriodYear extends Identifiable {
  status?: string
  year?: string
}

export interface PeriodYearPick extends Identifiable {
  year?: number
}
