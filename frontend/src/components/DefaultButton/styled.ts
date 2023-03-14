import styled from 'styled-components';
import {boxShadow, primaryColor} from '../../config/styles';

export const DefaultButton= styled.button<any>`
  padding: ${props => props.cover ? '8px 74px' : '8px 24px'};
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  background: ${primaryColor};
  border-radius: 20px;
  border: none;
  box-shadow: ${boxShadow};

  :hover{
    cursor: pointer;
  }

  :focus{
    outline: none;
  }

  > a {
    text-decoration: none;
    color: inherit;
  }
`;
