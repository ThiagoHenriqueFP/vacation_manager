import React, { useEffect, useState } from 'react';

import { NotificationContainer, ButtonSolicitation, VacationDataContainer, UList } from './styled'
import { INotification } from '../../../types/INotifications';
import axios from '../../../services/axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { IVacationData } from '../../../types/IVacationData';
import ModalSolicitation from '../ModalSolicitation';

export default function Notifications () {
  const state = useSelector((state: RootState) => state.login);

  const dateFormat = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const [notifications, setNotifications] = useState<INotification []>([]);
  const [vacationData, setVacationData] = useState<IVacationData>();
  const [isVisible, setIsVisible] = useState(false);
  const [canGetVacation, setCanGetVacation] = useState(false);

  useEffect(() => {
    async function notificationsData() {
      const { data }: {data: INotification[]} =  await axios.get(`/vacation/employee/${state.employee?.id}`,
      {
        headers: {
          Authorization: `Bearer ${state?.access_token}`
        }
      });
      setNotifications(data);
    }
    notificationsData();

    async function getVacationData() {
      const { data }= await axios.get(`/employee/vacation-data/${state.employee?.id}`,
      {
        headers: {
          Authorization: `Bearer ${state?.access_token}`
        }
      });
      setVacationData(data);
    }

    getVacationData();
  }, []);

  const notificationList = notifications.map(e => {
    const parsedStart = new Date(e.date_start).toLocaleString('pt-BR', dateFormat);
    const parsedEnd = new Date(e.date_end).toLocaleString('pt-BR', dateFormat);
    return(
      <li key={e.id}>
        <span>{`De ${parsedStart} à ${parsedEnd}`}</span>
        <span>Status: <strong>{ e.status && e.status > 0 ? 'Aprovada' : e.status && e.status < 0 ? 'Negada' :'Pendente'}</strong></span>
        {e.status && e.status >= 0? '' : <span>{e.description}</span>}
      </li>
    );
  });

  if(state.employee?.date_started){
    const started = new Date(state.employee?.date_started);
    started.setFullYear(started.getFullYear() + 1);
    if(started.getTime() >= new Date().getTime())
      setCanGetVacation(true);
  }

  const parsedLastVacation = vacationData?.date_last_vacation
    ? new Date(vacationData?.date_last_vacation).toLocaleString()
    : 'férias nunca solicitadas';


  async function setFlagAcquisitivePeriod() {
    await axios.patch(`/employee/${state.employee.id}`, {
      acquisitivePeriod: true
    });
  }

  let acquisitivePeriod: string = 'Férias em dias';

  if (state.employee?.date_started) {
    const parsedStart = new Date(state.employee?.date_started).getTime();
    const now = new Date().getTime();
    const diff = (now - parsedStart) / (1000 * 60 * 60 * 24 * 30 * 12);

    if (diff >= 1 && diff < 2){
      acquisitivePeriod = 'Você precisa tirar férias, seu primeiro período aquisitivo está vencido!';
      setFlagAcquisitivePeriod();
    }
    else if (diff >= 2 ){
      acquisitivePeriod = 'Entre em contato com o gesto para resolver os períodos aquisitivos!';
      setFlagAcquisitivePeriod();
    }

  }

  return (
    <NotificationContainer>
      <div className='separator'>
        <VacationDataContainer>
        <h3>Dados do empregado</h3>
          <span>Dias disponíveis: <strong>{vacationData?.days_remaining}</strong></span>
          <span>Data das últimas férias: <strong>{parsedLastVacation}</strong></span>
          <span><strong>{vacationData?.fortnigth ? 'Quinzena realizada' : 'Precisa tirar a quinzena'}</strong></span>
          {acquisitivePeriod && <span>{acquisitivePeriod}</span>}
        </VacationDataContainer>
        <VacationDataContainer>
        <h3>Notificações</h3>
          <UList>
            {notificationList.length > 0
              ? notificationList
              :'Nenhuma notificação para exibir'
            }
          </UList>
        </VacationDataContainer>
      </div>
      <ButtonSolicitation onClick={() => setIsVisible(true)}>Solicitar Férias</ButtonSolicitation>
      {isVisible && <ModalSolicitation
        isVisible={isVisible}
        onClose={setIsVisible}
        canVacation={canGetVacation}
        />
      }
    </NotificationContainer>
  )
}
