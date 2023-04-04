import styled from 'styled-components';
import { DefaultButton } from '../../../components/DefaultButton/styled';
import { Container } from '../../../config/styles';

export const NotificationContainer = styled(Container)`
  margin: auto;
  width: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;


  div {
    width: 100%;

    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  .separator {
    display: flex;
    gap: 12px;
  }
`;

export const ButtonSolicitation = styled(DefaultButton)`

`;

export const VacationDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  > span {
    margin-bottom: 8px;
  }
`;

export const UList = styled.ul`
list-style: none;
padding: 0;

overflow-y: auto;

> li {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;

  > small {
    margin: 12px;
  }
}
`;
