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
import { login } from '../../store/login.slice';
import { useDispatch } from 'react-redux';

export default function Login() {
  const [registration, setRegistration] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e: SyntheticEvent) {
    interface IResponse {
      access_token: string,
      employee: {
        id: number;
        name: string;
        type: number;
        registration: string;
        date_started: Date;
        isManager: boolean;
        manager_id: number;
      };
      team?: {
        id: number,
        name: string,
        sub_team?: string,
      }
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

      const data: IResponse = response.data;

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('employee_name', data.employee.name);
      localStorage.setItem('employee_registration', data.employee.registration);
      localStorage.setItem('employee_type', data.employee.type.toString());
      localStorage.setItem('employee_type', data.employee.date_started.toString());
      localStorage.setItem('employee_id', data.employee.id.toString());
      localStorage.setItem('team',data?.team.id.toString());

      const dispatchData = {
        ...data,
        isLogged: true,
      }

      dispatch(login(dispatchData));

      if (data.employee.type === 0){
        // if(!data.team){
        //   return navigate('/manager/team')
        // }

        return navigate('/manager');
      }

      return navigate('/employee');
    } catch (error: any) {
      //toast vvvv
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
          <Field
            value={registration}
            placeholder='Matricula'
            type='text'
            name='registration'
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setRegistration(e.target.value)}
          />
          <Field
            value={password}
            placeholder='Senha'
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
