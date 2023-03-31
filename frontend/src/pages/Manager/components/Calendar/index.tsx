import React, { useMemo, useState } from 'react';

import { Scheduler } from '@aldabil/react-scheduler';
import mock  from './calendarMock.json';
import { SchedulerContainer } from './styled';
import axios from '../../../../services/axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { checkOnVacation } from '../../../../services/updateEmployeesStatus';
import { IDashboard } from '../../../../types/IDashboard';

interface IEvents {
  event_id: number,
  title: string,
  start: Date,
  end: Date,
}

export default function CustomSchedule() {
  const state = useSelector((state: RootState) => state.login);

  const [vacations, setVacations] = useState<any>([]);

  if(state.access_token && state.team)
    checkOnVacation(state.access_token, state?.team?.id);

  useMemo(() => {
    async function getData(){

      const obj = await axios.get(`/vacation/${state?.team?.id}/0?employees=true`, {
        headers: {
          Authorization: `Bearer ${state.access_token}`
        }
      });

      console.log(obj);
    }

    getData();
    }, []);

  const eventObject: IEvents[] = [];

  for (const i of mock.vacations){
    const obj=  {
      event_id: i.event_id,
      title: `Ferias de ${i.title}`,
      start: new Date(i.start),
      end: new Date(i.end),
    };

    eventObject.push(obj);
  }

  return (
    <SchedulerContainer>
      <Scheduler
        events={eventObject}
        view='month'
      />
    </SchedulerContainer>
  );
}
