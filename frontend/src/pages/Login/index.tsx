import React, { SyntheticEvent, useState } from 'react';
import { Form, Link, redirect, useNavigate } from 'react-router-dom';

import qqLogo from '../../assets/logo.png';
import axios from '../../services/axios';
import { Field } from '../../components/DataField/styled';
import { IEmployee } from '../../types/IEmployee';
import {
  BackgroundLogin,
  ButtonLogin,
  LoginContainer,
  Logo,
  Recovery
} from './Styled';

export default function Login() {
  const [registration, setRegistration] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  async function handleSubmit(e: SyntheticEvent) {
    interface IReponse {
      access_token: string,
      employee: IEmployee,
    }

    e.preventDefault();

    let errors = false;

    if (password?.length < 6)
      errors = true;

    if (errors) return;


    const body = {
      registration,
      password
    };

    try {
      const response = await axios.post('/auth', body);

      const data: IReponse = response.data;

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('employee_name', data.employee.name);
      localStorage.setItem('employee_registration', data.employee.registration);
      localStorage.setItem('employee_type', data.employee.type.toString());
      localStorage.setItem('employee_type', data.employee.date_started.toString());



      if (data.employee.type === 0)
        return navigate('/manager');

      return navigate('/employee');
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <BackgroundLogin>
      <LoginContainer>
        <Logo
          src={qqLogo}
          alt='Logo da Lojas Quero Quero'
        />
        <Form className='form-login' onSubmit={handleSubmit}>
          <Field placeholder='Matricula'
            type='text'
            name='registration'
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setRegistration(e.target.value)}
          />
          <Field placeholder='Senha'
            type='password'
            name='password'
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
          />
          <ButtonLogin type='submit'>Entrar</ButtonLogin>
        </Form>
        <Link to='recovery'><Recovery>Esqueci minha senha</Recovery></Link>
      </LoginContainer>
    </BackgroundLogin>
  );
}
