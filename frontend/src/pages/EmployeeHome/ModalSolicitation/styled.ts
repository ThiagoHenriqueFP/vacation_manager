import styled from 'styled-components';
import { boxShadow, Container, containerColor } from '../../../config/styles';

export const ContainerModal = styled.div`
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

export const ModalBody = styled.form`
  padding: 24px;
  box-shadow: ${boxShadow};
  border: 0;
  border-radius: 20px;

  background: ${containerColor};

  margin:auto;
  max-width: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center !important;

  padding: 36px;

  svg {
    margin-left: auto;
    cursor: pointer;
  }
`;

export const Separator = styled.div`
  margin: 16px 0;

  display: flex;
  flex-direction: column;

  input[type='radio'] {
    margin: 0;
  }
`;

export const Select = styled.select`
  padding: 12px;
  border-radius: 20px;

  border: none;
  box-shadow: ${boxShadow};

  font-size: 1rem;
  background: #fff;
  width: 100%;
  height: 48px;

  option[value=""][disabled] {
    display: none;
  }

  option {
    color: black;
  }

  margin-bottom: 16px;
`;
