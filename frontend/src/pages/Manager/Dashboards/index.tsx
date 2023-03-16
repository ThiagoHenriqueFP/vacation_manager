import React from 'react';
import { MdNotificationImportant } from 'react-icons/md';
import { Link } from 'react-router-dom';

import {
  ChartContainer,
  DashContainer,
  DashHeader,
  ReportContainer,
  ReturnContainer,
  ToOutContainer
} from './styled';
import ChartPie from '../components/Chart';
import Button from '../../../components/DefaultButton';
import {toOut, toReturn} from './mock.json';
export default function DashboardsPage() {

  const current = new Date().toDateString();

  function renderList(obj: typeof toOut | typeof toReturn) {
    const data = obj.map((e) => {
      const returnDate = new Date(e.date).toLocaleDateString();
      return (
        <li key={e.id}>
          <span className='medium'>{e.name}</span>
          <span className='ligth space'>retorno: {returnDate}</span>
        </li>
      );
    });

    return data;
  }

  return (
    <DashContainer>
      <DashHeader>
        <h3>{current}</h3>
        <Link to='notifications'><MdNotificationImportant /></Link>
      </DashHeader>

      <ChartContainer>
        <ChartPie />
      </ChartContainer>

      <ReportContainer>
        <span>Relatórios</span>
        {/* <DataField name='start' placeholder='Data de inicio' type='date' label='Inicio'/>
        <DataField name='end' placeholder='Data de final' type='date' label='Fim'/> */}
        <Button cover={false}>Gerar Relatório</Button>
      </ReportContainer>

      <ReturnContainer>
        <span>Colaboradores de ferias </span>
        <ul>{renderList(toReturn)}</ul>
      </ReturnContainer>

      <ToOutContainer>
        <span>Proximos a sair de férias</span>
        <ul>{renderList(toOut)}</ul>
      </ToOutContainer>
    </DashContainer>
  );
}
