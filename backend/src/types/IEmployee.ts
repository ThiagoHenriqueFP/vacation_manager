export interface IEmployee {
  id?: number,
  name: string,
  type: number,
  registration: string
  password: string,
  date_started: Date,
  isManager: boolean
  manager_id?: number
  role: string,
  status: boolean
  email: string,
  gmail?: string
}

export interface IUpdateEmployee {
  name: string,
  type: number,
  registration: string
  date_started: Date,
  isManager: boolean
  manager_id?: number
  role: string,
  status: boolean
  email: string,
  gmail?: string
}
