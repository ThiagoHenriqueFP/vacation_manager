import { IDashboard } from '../types/IDashboard';
import axios from './axios';

export async function checkOnVacation(token: string, team: number) {
  // Solicitações aprovadas
  const { data }: {data: IDashboard[]} = await axios.get(`/vacation/${team}/1?employees=true`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const currentDate = new Date();
  //  Atualizando o status de funcionário
  data.map(async (e) => {
    if(currentDate >= e.date_start && currentDate <=e.date_end){
      await axios.patch(`/employee/status/${e.employee_id}`, {
        status: true
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    if(currentDate > e.date_end && e.status) {
      await axios.patch(`/employee/status/${e.employee_id}`, {
        status: false
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  });
}
