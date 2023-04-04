import React, { useMemo, useState } from 'react';

import { Scheduler } from '@aldabil/react-scheduler';
import { Loading, SchedulerContainer } from './styled';
import axios from '../../../../services/axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { checkOnVacation } from '../../../../services/updateEmployeesStatus';
import { INotification } from '../../../../types/INotifications';
import { ProcessedEvent } from '@aldabil/react-scheduler/types';

interface IEvents {
  event_id: number,
  title: string,
  start: Date,
  end: Date,
}

export default function CustomSchedule() {
  const state = useSelector((state: RootState) => state.login);
  const [vacations, setVacations] = useState<ProcessedEvent []>([]);
  const [isLoading, setIsLoading] = useState(true);

  if(state.access_token && state.team)
    checkOnVacation(state.access_token, state?.team?.id);

  useMemo(() => {
    async function getData(){
      const {data}: {data: INotification[]} = await axios.get(`/vacation/${state?.team?.id}/1?employees=true`, {
        headers: {
          Authorization: `Bearer ${state.access_token}`
        }
      });

      const obj: ProcessedEvent[] = data.map(e => {
        const parsedStart = e.date_start.slice(0, 16).replace('T', ' ');
        const parsedEnd = e.date_end.slice(0, 16).replace('T', ' ');

        const parsed: ProcessedEvent = {
          event_id: e.id,
          title: `Ferias de ${e.Employee.name}`,
          start: new Date(parsedStart),
          end: new Date(parsedEnd),
        }

        return parsed;
      });
      setVacations(obj);
      setIsLoading(false);
    }
    getData();
  }, []);

  if(isLoading) {
    return <Loading>Loading</Loading>
  }

  return (
    <SchedulerContainer>
      <Scheduler
        events={vacations}
        view='month'
        />
    </SchedulerContainer>
  );
}
