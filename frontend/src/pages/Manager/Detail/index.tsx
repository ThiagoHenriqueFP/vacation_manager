import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/DefaultButton';

import NotificationList from '../components/NotificationsList';
import TeamList from '../components/TeamList';
import { DetailSection,DetailContainer, DetailList } from './styled';

export default function Detail() {
  return (
    <DetailContainer>
      <DetailSection>
        <h3>Colaboradores na equipe</h3>
        <Button>Inserir Colaborador</Button>
        <DetailList>
          <TeamList />
        </ DetailList>
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
