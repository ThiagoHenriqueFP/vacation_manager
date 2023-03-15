import React from 'react';
import {notifications} from './mock.json';

interface INotification {
  id: number,
  name: string,
  days_out: number,
  start: string,
  registration: number,
}

export default function NotificationList() {

  const notificationList: INotification[] = [];

  for(const i of notifications)
    notificationList.push(i);

  const list = notificationList.map((el) => {
    const start = new Date(el.start);
    const end = new Date(start.setDate(start.getDate() + el.days_out));
    return (
      <li key={el.id}>
        <span>{el.name}</span>
        <br />
        <span>Matricula: {el.registration}</span>
        <br />
        <span>Dias de folga: {el.days_out} dias</span>
        <br />
        <span>Inicio: {start.toLocaleDateString()} Fim: {end.toLocaleDateString()}</span>
      </li>
    );
  });

  return (
    <ul>
      {list}
    </ul>
  );
}
