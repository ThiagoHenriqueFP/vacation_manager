import React from 'react';
import { notifications } from './mock.json';
import { ButtonContainer } from './styled';
import { ImCancelCircle, ImCalendar } from 'react-icons/im';
import { DefaultButton } from '../../../../components/DefaultButton/styled';
import { INotification } from '../../../../types/INotifications';

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
        <br />
        <ButtonContainer>
          <DefaultButton
            className='accept'
            onClick={() => console.log(`aceitando o pedido de ${el.id}`)}
            icon={<ImCalendar />}
            color='#000'
          >
            <ImCalendar/>
          </DefaultButton>

          <DefaultButton
            className='reject'
            onClick={() => console.log(`rejeitando o pedido de ${el.id}`)}
            icon={<ImCancelCircle />}
            color='#000'
          >
            <ImCancelCircle />
          </DefaultButton>
        </ButtonContainer>
      </li>
    );
  });

  return (
    <ul>
      {list}
    </ul>
  );
}
