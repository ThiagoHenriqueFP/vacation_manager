import styled from 'styled-components';

import { boxShadow, containerColor } from '../../../config/styles';

export const Container = styled.div`
  position: fixed;
  left: 0;
  right:0;
  top: 0;
  bottom:0;

  background-color: rgba(0,0,0,0.5);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height:100%;
  width: 100%;

  z-index: 1;
`;

export const Register = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: ${containerColor};
  box-shadow: ${boxShadow};
  border-radius: 20px;

  margin: 0 auto;
  margin-top: 32px;
  padding: 60px;

  max-width: 600px;
  max-height: 450px;

  .separator {
    display: flex;
    gap: 8px;
  }

  .close-icon {
    display: inline-block;
    position: relative;
    left: 50%;
    bottom: 30px;
    color: black;
  }
`;
