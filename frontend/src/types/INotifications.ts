export interface INotification {
  id: number,
  date_start: string,
  date_end: string,
  status?: number,
  Employee: {
    name: string,
    registration?: string,
    id: number,
  }
}
