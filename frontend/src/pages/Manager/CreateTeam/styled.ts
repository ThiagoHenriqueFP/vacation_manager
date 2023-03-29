import styled from 'styled-components';
import { Field } from '../../../components/DataField/styled';
import { DefaultButton } from '../../../components/DefaultButton/styled';
import { Container } from '../../../config/styles';

export const ContainerCreateTeam = styled(Container)`
  margin: auto;
  padding: 16px;
  form {
    display: flex;
    flex-direction: column;
  }
`;

export const TeamButton = styled(DefaultButton)`
  margin: auto;
`;

export const TeamInput = styled(Field)`
  margin: 0 auto 12px;
`;
