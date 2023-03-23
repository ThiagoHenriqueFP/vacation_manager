export interface INotification {
  id: number,
  date_start: string,
  date_end: string,
  status?: boolean,
  Employee: {
    name: string,
  }
}
