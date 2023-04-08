export interface ILogin {
  access_token?: string;
  employee?: {
    id: number;
    name: string;
    type: number;
    registration: string;
    date_started: Date;
    isManager: boolean;
    manager_id: number;
    email: string;
    gmail: string;
  };
  team?: {
    id: number,
    name: string,
    sub_team?: string,
  }
  isLogged: boolean;
}
