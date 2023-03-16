import React from 'react';

import NotificationList from '../../../components/NotificationsList';
import TeamList from '../../../components/TeamList';
import { DetailSection,DetailContainer } from './styled';

export default function Detail() {
  return (
    <DetailContainer>
      <DetailSection>
        <TeamList />
      </ DetailSection>
      <DetailSection>
        <NotificationList />
      </DetailSection>
    </DetailContainer>
  );
}
