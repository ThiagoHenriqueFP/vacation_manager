import styled from 'styled-components';
import { boxShadow, Container } from '../../../config/styles';

export const DetailList = styled(Container)`
  min-height: 70%;
  max-height: 70%;
  > ul {
    list-style: none;
    padding: 0;

    overflow-y: auto;

    > li {
      margin-bottom: 8px;
      border-radius: 20px;
      box-shadow: ${boxShadow};
      padding: 12px;
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

export const DetailSection = styled.div`
  button {
    margin-top: 16px;
  }
`;

export const DetailContainer = styled.div`
  display: flex;
  justify-content: space-evenly;

  margin: auto;

  width: inherit;
  height: inherit;
`;
