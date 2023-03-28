import React, { SyntheticEvent, useState } from 'react';

import { DetailSection,DetailContainer, DetailList } from './styled';
import Button from '../../../components/DefaultButton';
import TeamList from '../components/TeamList';
import ModalRegisterEmployee from '../ModalRegisterEmployee';

export default function Detail() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <DetailContainer>
      <DetailSection>
        <h3>Colaboradores na equipe</h3>
        <DetailList>
          <TeamList />
        </ DetailList>
        <Button onClick={() => setIsVisible(!isVisible)}>Inserir Colaborador</Button>
        {isVisible && <ModalRegisterEmployee isVisible={isVisible} onClose={setIsVisible}/> }
      </DetailSection>
      {/* <DetailSection>
        <h3>Solicitações de Férias</h3>
        <DetailList>
          <NotificationList />
        </DetailList>
        <Link to='/manager/notifications'><Button>Histórico de solicitações</Button></Link>
      </DetailSection> */}
    </DetailContainer>
  );
}
