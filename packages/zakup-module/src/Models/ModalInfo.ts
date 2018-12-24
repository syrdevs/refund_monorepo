export interface ModalInfo {
  header: string
  content: any
  onClose?: (...args: any[]) => any
  closable?: boolean
}
