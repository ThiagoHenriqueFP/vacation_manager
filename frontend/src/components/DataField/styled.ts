import styled from 'styled-components';

export const Field = styled.input<any>`
  background: #fff;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  padding: 12px 24px;
  margin: 0 0 24px 0;
  font-size:1rem;
  font-weight: 400;
  max-width: ${props => props.size ? `${props.size}px` : '100%'};

  :focus{
    outline: none;
  }

  ::-webkit-inner-spin-button{
        -webkit-appearance: none;
        margin: 0;
  }
  ::-webkit-outer-spin-button{
        -webkit-appearance: none;
        margin: 0;
  }

`;
