import React from 'react';
import { Link } from 'react-router-dom';

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
        <DataField placeholder='Matricula' type='number'name='registration'/>
        <DataField placeholder='Senha' type='password' name='password'/>
        <Link to='manager'><Button>Entrar</Button></Link>
        <Link to='recovery'><Recovery>Esqueci minha senha</Recovery></Link>
      </LoginContainer>
    </BackgroundLogin>
  );
}
