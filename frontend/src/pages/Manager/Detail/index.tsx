import React, { useMemo, useState } from 'react';

import { DetailSection,DetailContainer, DetailList } from './styled';
import Button from '../../../components/DefaultButton';
import TeamList from '../components/TeamList';
import ModalRegisterEmployee from '../ModalRegisterEmployee';
import { IEmployee } from '../../../types/IEmployee';
import axios from '../../../services/axios';

export default function Detail() {
  const [isVisible, setIsVisible] = useState(false);
  const [acquitivePeriod, setAquisitivePeriod] = useState<IEmployee []>([]);

  useMemo(() => {
    async function getEmployee() {
      const employee = await axios.get('/employee')
    }
  }, []);

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
    </DetailContainer>
  );
}
