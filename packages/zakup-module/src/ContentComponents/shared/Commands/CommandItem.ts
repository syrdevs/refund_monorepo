export type CommandItem = {
  id: string
  name: string
  commandType: {
    typeId: number
    typeDesc: string
  }
  parameters: any[]
}
