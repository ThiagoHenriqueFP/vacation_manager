import React from 'react';

import DataField from '../../../components/DataField';
import Button from '../../../components/DefaultButton';
import { Container, Register } from './styled';

import { AiOutlineClose } from 'react-icons/all';

interface IModalRegister {
  isVisible: boolean;
  onClose: React.MouseEventHandler;
}

export default function ModalRegisterEmployee ({isVisible, onClose}: IModalRegister) {
  if(!isVisible)
    return null;

  return (
    <Container>
      <Register method='POST' action=''>
        <AiOutlineClose onClick={onClose} className='close-icon'/>
        <div className='separator'>
          <DataField placeholder='Tipo' type='number' size={80} name='type'/>
          <DataField placeholder='Matricula' type='text' size={80} name='registration'/>
        </div>
        <DataField placeholder='Nome' type='text' name='name'/>
        <DataField placeholder='Email' type='email' name='email'/>
        <DataField placeholder='Data de início' type='date' name='data_start' label='Data de inicio'/>

        <Button cover={false}>Cadastrar</Button>
      </Register>
    </Container>
  );
}
