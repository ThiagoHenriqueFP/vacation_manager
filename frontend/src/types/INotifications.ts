export interface INotification {
  id: number,
  date_start: string,
  date_end: string,
  status?: number,
  reason: string,
  Employee: {
    name: string,
    registration?: string,
    id: number,
  }
}
