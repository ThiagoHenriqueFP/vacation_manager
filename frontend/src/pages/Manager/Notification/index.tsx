import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../../services/axios';
import { RootState } from '../../../store';
import { INotification } from '../../../types/INotifications';
import NotificationList from '../components/NotificationsList';

export default function NotificationPage() {
  const state = useSelector((state: RootState) => state.login);
  const [allNotifications, setAllNotifications] = useState<INotification[]| null>();

  const team = localStorage.getItem('team');

  useEffect(() => {
    if(!team)
      return;

    axios.get(`/vacation/team/${parseInt(team)}?employees=true`,
      {
        headers: {
          Authorization: `Bearer ${state.access_token}`
        }
      }
    ).then((response) => setAllNotifications(response.data))
    .catch(error => console.log(error));
  }, [allNotifications]);

  return (
    <>
      <NotificationList isPending={true} />
      <NotificationList />
    </>
  );

  // return (
  //   <>
  //     <span>Notificações pendentes</span>
  //     <ul>
  //       {pendingNotifications && pendingNotifications.map((e)=> {
  //         const parsedStart = new Date(e.date_start).toLocaleDateString();
  //         const parsedEnd = new Date(e.date_end).toLocaleDateString();
  //         let status;
  //         if(e.status && e.status < 0)
  //           status = 'rejeitado';
  //         else if (e.status && e.status > 0)
  //           status = 'aceito'
  //         else
  //           status = 'pendente';


  //           return(
  //             <li key={e.id}>
  //               <span>{e.Employee.name}</span>
  //               <span>{parsedStart}</span>
  //               <span>{parsedEnd}</span>
  //               <span>{status}</span>
  //             </li>
  //           );
  //       })}
  //     </ul>

  //     <span>Historico de notificações</span>
  //     <ul>
  //       {allNotifications && allNotifications.map((e)=> {
  //         return(
  //           <li key={e.id}>
  //             <span>{e.Employee.name}</span>
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   </>
  // );
}
