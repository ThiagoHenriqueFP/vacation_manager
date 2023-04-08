import styled from 'styled-components';
import {boxShadow, primaryColor} from '../../config/styles';

export const DefaultButton= styled.button<any>`
  padding: ${props => props.cover ? '8px 74px' : '8px 24px'};
  color: ${props => props.color ? props.color : '#fff'};
  font-weight: 600;
  font-size: 1rem;
  background: ${primaryColor};
  border-radius: 20px;
  border: none;
  box-shadow: ${boxShadow};

  display: flex;
  align-items: center;
  gap: 4px;

  :hover{
    cursor: pointer;
  }

  :focus{
    outline: none;
  }

  :disabled {
    background: grey;
  }

  > a {
    text-decoration: none;
    color: inherit;
  }
`;
