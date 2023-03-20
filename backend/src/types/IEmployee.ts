export interface IEmployee {
  name: string;
  type: number;
  registration: string;
  password: string;
  date_started: Date;
  isManager?: boolean;
  manager_id?: number;
}
