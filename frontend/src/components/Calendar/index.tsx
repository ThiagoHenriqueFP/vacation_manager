import React from 'react';

import { Scheduler } from '@aldabil/react-scheduler';
import mock  from './calendarMock.json';
import { SchedulerContainer } from './styled';

interface IEvents {
  event_id: number,
  title: string,
  start: Date,
  end: Date,
}

export default function CustomSchedule() {

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
