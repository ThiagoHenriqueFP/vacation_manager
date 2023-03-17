import React from 'react';
import Button from '../../../components/DefaultButton';

import NotificationList from '../components/NotificationsList';
import TeamList from '../components/TeamList';
import { DetailSection,DetailContainer, DetailList } from './styled';

export default function Detail() {
  return (
    <DetailContainer>
      <DetailSection>
        <h3>Colaboradores na equipe</h3>
        <DetailList>
          <TeamList />
        </ DetailList>
        <Button>Inserir Colaborador</Button>
      </DetailSection>
      <DetailSection>
        <h3>Solicitações de Férias</h3>
        <DetailList>
          <NotificationList />
        </DetailList>
        <Button>Histórico de solicitações</Button>
      </DetailSection>
    </DetailContainer>
  );
}
