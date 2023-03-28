import styled from 'styled-components';
import { DefaultButton } from '../../../components/DefaultButton/styled';


import { boxShadow, containerColor, primaryColor } from '../../../config/styles';

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
  display: grid;
  /* flex-direction: column;
  align-items: center;
  justify-content: center; */

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
    left: 100%;
    bottom: 30px;
    color: black;
  }

  button {
    width: 120px;
    margin: auto;
    display: flex;
    flex-direction: column;

    margin-bottom: 16px;
  }

  span {
    text-align: center;
    color: grey;
    margin-bottom: 16px;
  }
`;

export const Select = styled.select`
  padding: 12px;
  border-radius: 20px;

  border: none;
  box-shadow: ${boxShadow};

  font-size: 1rem;

  option[value=""][disabled] {
    display: none;
  }

  option {
    color: black;
  }

  margin-bottom: 16px;
`;

export const DataField = styled.input`
  padding: 12px;
  border-radius: 20px;

  width: 200px;
  border: none;
  box-shadow: ${boxShadow};
  font-size: 1rem;

  background: #efefef;
  margin-bottom: 16px;

  ::placeholder {
    color: black;
    padding-left: 5px;
  }
`;

export const ModalButton = styled.button`
padding: 8px 74px;
  color: #fff;
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

  > a {
    text-decoration: none;
    color: inherit;
  }
`;
