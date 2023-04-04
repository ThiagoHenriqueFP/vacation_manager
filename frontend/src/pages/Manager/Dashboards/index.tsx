import React, { useEffect, useMemo, useState } from 'react';
import { HiDocumentReport } from 'react-icons/hi';
import { useSelector } from 'react-redux';

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
import axios from '../../../services/axios';
import { RootState } from '../../../store';
import { IDashboard } from '../../../types/IDashboard';

export default function DashboardsPage() {
  const state = useSelector((state: RootState) => state.login);

  const [onVacation, setOnVacation] = useState<IDashboard []>([]);
  const [toOut, setToOut] = useState<IDashboard []>([]);

  const current = new Date();

  function renderList(obj: IDashboard[], isOut = true) {
    if (isOut) {
      const data = obj.map((e) => {
        const returnDate = new Date(e.date_end).toLocaleDateString();
        return (
          <li key={e?.id}>
          <span className='medium'>{e.Employee.name}</span>
          <span className='ligth space'>retorno: {returnDate}</span>
        </li>
        );
      });

      return data;
    } else {
      const data = obj.map(e => {
        const outDate = new Date(e.date_start).toLocaleString();
        return (
          <li key={e?.id}>
            <span className='medium'>{e.Employee.name}</span>
            <span className='ligth space'>retorno: {outDate}</span>
          </li>
        )
      });
      return data;
    }
  }


  useEffect(() => {
    async function checkOnVacationEmployees() {
      try {
        if (state.team) {
          const response = await axios.get(`/vacation/${state.team.id}/1?employees=true`, {
            headers: {
              Authorization: `Bearer ${state.access_token}`
            }
          });

          const obj = response.data.map(async (e: IDashboard) => {
            const parsedStart = new Date(e.date_start).getTime();
            const parsedEnd = new Date(e.date_end).getTime();

            if(current.getTime() >= parsedStart && current.getTime() <= parsedEnd){
              await axios.patch(`/employee/status/${e.Employee.id}`, {
                status: true
              });
            }
          });

          setOnVacation(obj);
      }
      } catch (error) {
        console.log(error);
      }
    }
    checkOnVacationEmployees();

    async function checkActiveEmployees() {
      try {
        if (state.team) {
          // get all aproved vacations from team
          const response = await axios.get(`/vacation/${state.team.id}/1?employees=true`, {
            headers: {
              Authorization: `Bearer ${state.access_token}`
            }
          });

        response.data.map((e: IDashboard) => {
          const parsedStart = new Date(e.date_start).getTime();
          if(current.getTime() <= parsedStart){
            const obj = toOut;
            obj.push(e);
            setToOut(obj);
          }
        });
        console.log(toOut);
      }
      } catch(error) {
        console.log(error);
      }
    }
    checkActiveEmployees();

  }, [onVacation, toOut]);

  return (
    <DashContainer>
      <DashHeader>
        <h3>{current.toDateString()}</h3>
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
        {onVacation.length == 0
          ? <span>Nenhum Colaborador de férias</span>
          : <ul>{renderList(onVacation)}</ul>
        }
      </ReturnContainer>

      <ToOutContainer>
        <span>Proximos a sair de férias</span>
        {onVacation.length < 1
          ? <span>Nenhum Colaborador com férias registradas</span>
          : <ul>{renderList(toOut, false)}</ul>
        }
      </ToOutContainer>
    </DashContainer>
  );
}
