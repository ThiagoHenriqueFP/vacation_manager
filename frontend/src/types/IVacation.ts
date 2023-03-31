export interface IVacation {
  id?: number;
  employee_id: number;
  team_id: number;
  date_start: string | Date;
  date_end: string | Date;
  status?: number;
}
