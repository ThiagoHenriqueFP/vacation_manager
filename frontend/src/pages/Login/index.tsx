import React from 'react';

import qqLogo from '../../assets/logo.png';

import DataField from '../../components/DataField/index';
import Button from '../../components/DefaultButton';

import { BackgroundLogin, LoginContainer, Logo, Recovery} from './Styled';
export default function Login() {
  return (
    <BackgroundLogin>
      <LoginContainer>
        <Logo
          src={qqLogo}
          alt='Logo da Lojas Quero Quero'
        />
        <DataField placeholder='Matricula' type='number'/>
        <DataField placeholder='Senha' type='password'/>
        <Button>Entrar</Button>
        <Recovery>Esqueci minha senha</Recovery>
      </LoginContainer>
    </BackgroundLogin>
  );
}
