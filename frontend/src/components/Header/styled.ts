import styled from 'styled-components';
import { primaryColor } from '../../config/styles';

export const Header = styled.header`
  display: flex;
  padding: 32px 48px;
  background: ${primaryColor};
  color: #fff;

  span {
    font-size: 1.6rem;
    font-weight: 700;
  }

`;
