import styled from 'styled-components';
import { containerColor, boxShadow } from '../../../config/styles';

export const DashboardContainer = styled.div`
  background: ${containerColor};
  margin: auto;
  padding: 32px;

  box-shadow: ${boxShadow};
  border-radius: 20px;
`;
