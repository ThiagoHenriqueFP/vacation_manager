import styled from 'styled-components';
import { boxShadow, Container, primaryColor } from '../../../../config/styles';

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

export const DetailList = styled(Container)`
  margin: auto;

  max-height: 80%;

  min-width: 25%;
  overflow-y: auto;

  h3 {
    margin: 16px 0 0 0;;
  }

  .strong {
    font-weight: 600;
  }

  > ul {
    list-style: none;
    padding: 0;

    overflow-y: auto;

    > li {
      margin-bottom: 8px;
      border-radius: 20px;
      box-shadow: ${boxShadow};
      padding: 16px;
      background: #fff;

      > small {
        margin: 12px;
      }
    }
  }

  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
