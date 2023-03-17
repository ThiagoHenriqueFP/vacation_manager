import React from 'react';
import { MdNotificationImportant } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { HiDocumentReport } from 'react-icons/hi';

import {
  ChartContainer,
  DashContainer,
  DashHeader,
  ReportContainer,
  ReturnContainer,
  Separator,
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
        <Link to='/notifications'><MdNotificationImportant /></Link>
      </DashHeader>

      <ChartContainer>
        <ChartPie />
      </ChartContainer>

      <ReportContainer>
        <span>Relatórios</span>
        <Separator>
          <p className="label">Período: início</p>
          <input type="date" name="start" id="" />
          <p className="label">Período: fim</p>
          <input type="date" name="end" id="" />
        </Separator>
        <Button>Gerar Relatório {<HiDocumentReport />}</Button>
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
