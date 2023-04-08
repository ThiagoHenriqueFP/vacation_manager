import React, { useEffect, useState } from 'react';
import { Separator } from './styled';
import axios from '../../../../services/axios';
import { useSelector } from 'react-redux';
import { IEmployee } from '../../../../types/IEmployee';
import { RootState } from '../../../../store';
import { DefaultButton } from '../../../../components/DefaultButton/styled';
import { FaTrashAlt } from 'react-icons/fa';

interface ITeamInfo {
  id: number,
  name: string,
  sut_team: string,
  manager_id: number,
  team_employee: [{
    team_id: number,
    employee_id: number,
    employee: IEmployee
  }]
}

interface IMapReturn {
  team_id: number;
  employee_id: number;
  employee: IEmployee;
}

export default function TeamList() {
  const state = useSelector((state: RootState) => state.login);
  const [data, setData] = useState<ITeamInfo>();

  async function handleRemove(e: React.SyntheticEvent, datMap: IMapReturn) {
    e.preventDefault();

    try{
      await axios.delete(`/team/remove/${datMap.team_id}/${datMap.employee_id}`,{
        headers: {
          Authorization: `Bearer ${state.access_token}`
        }
      });

    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    if(state.team){
      axios.get(`/team/${state.team.id}`, {
        headers: {
          Authorization: `Bearer ${state.access_token}`
        }
      })
        .then(response => setData(response.data));
    }
  }, [data]);

  if(!data) return null;

  if (!data.team_employee.length) return <p>O Time está vazio</p>

  const employeeList = data.team_employee.map((el) => {
    return (
      <li key={el.employee.id}>
        <span>{el.employee.name}</span>
        <Separator>
          <small>Tipo: {el.employee.type ? 'PJ' : 'CLT' }</small>
          <small>{el.employee.role}</small>
          <small>Status: <strong>{el.employee.status ? 'De ferias': 'Ativo'}</strong></small>
          {el.employee.acquisitivePeriod && <span>!</span>}
          <DefaultButton
            clasName="remove"
            onClick={(e: React.SyntheticEvent) => handleRemove(e, el)}
          >
              <FaTrashAlt />
          </DefaultButton>
        </Separator>
      </li>
    );
  });

  return (
    <ul>
      {employeeList}
    </ul>
  );
}
