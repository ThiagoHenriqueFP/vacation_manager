import styled from 'styled-components';
import { boxShadow, Container } from '../../../config/styles';

export const DetailSection = styled(Container)`
  > ul {
    list-style: none;
    padding: 0;

    > li {
      margin-bottom: 8px;
      border-radius: 20px;
      box-shadow: ${boxShadow};
      padding: 12px;

      > small {
        margin: 12px;
      }
    }
  }

  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin: auto;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: inherit;
`;
