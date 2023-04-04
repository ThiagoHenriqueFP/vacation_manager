import styled from 'styled-components';
import { DefaultButton } from '../../../../components/DefaultButton/styled';
import { boxShadow, errorColor } from '../../../../config/styles';
import { ContainerCreateTeam } from '../../CreateTeam/styled';
import { Container } from '../../ModalRegisterEmployee/styled';

export const ModalContainer = styled(Container)``;

export const RejectContainer = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 20px;
  box-shadow: ${boxShadow};

  display: flex;
  flex-direction: column;
  align-items: center;


  svg {
    margin-left: auto;
    margin-bottom: 16px;
  }
`;

export const RejectButton = styled(DefaultButton)`
  background: ${errorColor};

  max-width: fit-content;
`;
