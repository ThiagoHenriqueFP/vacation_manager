import React from 'react';
import { INotification } from '../../../types/INotifications';

import { notifications } from './mock.json';

export default function NotificationPage() {
  const notificationList: INotification[] =[];

  for(const i of notifications)
    notificationList.push(i);

  return (
    <>
      <span>Notificações pendentes</span>
      <ul>
        {notificationList.map((e)=> {
          if(e.open){

            return(
              <li key={e.id}>
                <span>{e.name}</span>
              </li>
            );
          }
        })}
      </ul>

      <span>Historico de notificações</span>
      <ul>
        {notificationList.map((e)=> {
          return(
            <li key={e.id}>
              <span>{e.name}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
