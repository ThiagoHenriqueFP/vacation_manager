import React from 'react';
import { Separator } from './styled';
import { details } from './mock.json';

interface ITeamInfo {
  id: number,
  name: string,
  role: string,
  type: number,
  status: number,
}

export default function TeamList() {
  const team: ITeamInfo[] = [];

  for(const i of details){
    team.push(i);
  }

  console.log(team);


  const employeeList = team.map((el) => {
    return (
      <li key={el.id}>
        <span>{el.name}</span>
        <Separator>
          <small>Tipo: {el.type ? 'PJ' : 'CLT' }</small>
          <small>{el.role}</small>
          <small>Status: <strong>{el.status ? 'Ativo' : 'De ferias'}</strong></small>
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
