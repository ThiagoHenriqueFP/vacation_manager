import React, { SyntheticEvent, useEffect, useState } from 'react';

import axios from '../../../../services/axios';

import { ImCancelCircle, ImCalendar } from 'react-icons/im';
import { ButtonContainer, DetailList } from './styled';
import { DefaultButton } from '../../../../components/DefaultButton/styled';

import { INotification } from '../../../../types/INotifications';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

export default function NotificationList(props: any) {
  const login = useSelector((state: RootState )=> state.login);
  const [notifications, setNotifications] = useState<INotification []>();
  const team = localStorage.getItem('team');

  useEffect(() => {
    if(team)
      if(props.isPending) {
        axios.get(`/vacation/${team}/0`,
        {
          headers: {
            Authorization: `Bearer ${login.access_token}`
          }
        }
        )
        .then(response => setNotifications(response.data))
        .catch(error => console.log(error));
      } else {
        axios.get(`/vacation/team/${team}`,
        {
          headers: {
            Authorization: `Bearer ${login.access_token}`
          }
        }
        )
        .then(response => setNotifications(response.data))
        .catch(error => console.log(error));
      }
  }, [notifications]);

  function updateState(id: number) {
    const target = notifications?.findIndex(obj => obj.id === id);

    if (target && target > -1)
      setNotifications(notifications?.splice(target, 1));
  }

  async function handleAccept(
    event: SyntheticEvent,
    id: number,
    employee_id: number,
    date_start: string,
    date_end: string
  ) {
    event.preventDefault();

    const body = {
      status: 1,
      employee_id,
      date_start,
      date_end,
    }

    await axios.patch(`/vacation/${id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${login.access_token}`
        }
      }
    )
      .then(response => console.log(response))
      .catch(error => console.log(error));

      updateState(id);
  }

  async function handleReject(event: SyntheticEvent, id: number)  {
    event.preventDefault();

    const body = {
      status: -1
    }

    await axios.patch(`/vacation/${id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${login.access_token}`
        }
      }
    )
      .then(response => console.log(response))
      .catch(error => console.log(error));

      updateState(id);
  }

  if (!notifications)
    return <span>Nenhuma notificação pendente!</span>

  const list = notifications.map((e) => {
    const start = new Date(e.date_start);
    const end = new Date(e.date_end);
    const daysOut = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    return (
      <li key={e.id}>
        <span>{e.Employee.name}</span>
        <br />
        <span>Matricula: {e.Employee.registration}</span>
        <br />
        <span>Dias de folga: {daysOut} dias</span>
        <br />
        <span>Inicio:
          <span className='strong'>
            {start.toLocaleDateString()}
          </span> Fim:
          <span className='strong'>
            {end.toLocaleDateString()}
          </span>
        </span>
        <br />
        {!props.isPending && <span>{e.status > 0 ? 'Aceito' : e.status < 0 ? 'Rejeitado' : 'Pendente'}</span>}
        {props.isPending && <ButtonContainer>
          <DefaultButton
            className='accept'
            onClick={
              (event: React.SyntheticEvent<Element, Event>) => handleAccept(
                event,
                e.id,
                e.Employee.id,
                e.date_start,
                e.date_end
              )
            }
            icon={<ImCalendar />}
            color='#000'
          >
            <ImCalendar/>
          </DefaultButton>

          <DefaultButton
            className='reject'
            onClick={(event: React.SyntheticEvent<Element, Event>) => handleReject(event, e.id)}
            icon={<ImCancelCircle />}
            color='#000'
          >
            <ImCancelCircle />
          </DefaultButton>
        </ButtonContainer>}
      </li>
    );
  });

  return (
    <DetailList>
      <h3>{props.isPending ? 'Notificações pendentes' : 'Histórico de notficações'}</h3>
      <ul>
        {list}
      </ul>
    </DetailList>
  );
}
