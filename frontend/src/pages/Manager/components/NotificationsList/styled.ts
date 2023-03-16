import styled from 'styled-components';
import { primaryColor } from '../../../../config/styles';

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: end;
  padding: 8px;

  .accept {
    background: ${primaryColor}
  }

  .reject {
    background: #F93636;
  }

  > button {
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    border-radius: 100px;

    cursor: pointer;
  }
`;
