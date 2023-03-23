import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../../services/axios';
import { RootState } from '../../../store';
import { INotification } from '../../../types/INotifications';

export default function NotificationPage() {
  const state = useSelector((state: RootState) => state.login);
  const [allNotifications, setAllNotifications] = useState<INotification[]| null>();
  const [pendingNotifications, setPendingNotifications] = useState<INotification[] | null>();

  const team = localStorage.getItem('team');

  useEffect(() => {
    axios.get(`/vacation/team/${parseInt(team)}?employees=true`,
      {
        headers: {
          Authorization: `Bearer ${state.access_token}`
        }
      }
    ).then((response) => setAllNotifications(response.data))
    .catch(error => console.log(error));

    axios.get(`/vacation/${parseInt(team)}/0?employees=true`,
      {
        headers: {
          Authorization: `Bearer ${state.access_token}`
        }
      }
    ).then((response) => setPendingNotifications(response.data))
    .catch(error => console.log(error));
  }, []);

  console.log(allNotifications);
  console.log(pendingNotifications);

  return (
    <>
      <span>Notificações pendentes</span>
      <ul>
        {allNotifications && allNotifications.map((e)=> {
            return(
              <li key={e.id}>
                <span>{e.Employee.name}</span>
              </li>
            );
        })}
      </ul>

      <span>Historico de notificações</span>
      <ul>
        {pendingNotifications && pendingNotifications.map((e)=> {
          return(
            <li key={e.id}>
              <span>{e.Employee.name}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
