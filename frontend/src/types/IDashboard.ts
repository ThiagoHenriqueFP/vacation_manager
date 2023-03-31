export interface IDashboard {
  id?: number;
  employee_id: number;
  team_id: number;
  date_start: string | Date;
  date_end: string | Date;
  status?: number;
  Employee: {
    name: string,
    registration: string,
    id: 4
  }
}
