import styled from 'styled-components';
import { DefaultButton } from '../../../../components/DefaultButton/styled';
import {Container as BodyContainer} from '../../../../config/styles';
import { Container } from '../../ModalRegisterEmployee/styled';


export const ModalBackground = styled(Container)`
  height: 100%;
`;

export const ModalContainer = styled(BodyContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    margin-left: auto;
    cursor: pointer;
  }
`;

export const Type = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Separator = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Button = styled(DefaultButton)`
  display: flex;
  flex-direction: column;
`;
