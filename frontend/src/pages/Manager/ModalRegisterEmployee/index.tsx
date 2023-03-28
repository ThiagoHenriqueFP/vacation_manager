import React, { SyntheticEvent, useState } from 'react';
import { AiOutlineClose } from 'react-icons/all';
import AsyncSelect from 'react-select/async';

import Button from '../../../components/DefaultButton';
import axios from '../../../services/axios';
import { Container, Register, Select, DataField, ModalButton } from './styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { IEmployee } from '../../../types/IEmployee';

interface IModalRegister {
  isVisible: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalRegisterEmployee ({isVisible, onClose}: IModalRegister) {
  const [isRegister, setIsRegister] = useState(false);

  const [registration, setRegistration] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [gmail, setGmail] = useState("");
  const [date, setDate] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState(0);

  const state = useSelector((state: RootState) => state.login);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    if(isRegister){
      const body = {
        registration,
        name,
        type: parseInt(type),
        role,
        email,
        gmail,
        date_started: date,
        manager_id: state.employee?.id,
      }

      try {
        return await axios.post('/employee',
          body,
          {
            headers: {
              Authorization: `Bearer ${state.access_token}`
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post(`/team/insert`, {
        employee_id: id,
        team_id: state.team?.id
      }, {
        headers: {
          Authorization: `Bearer ${state.access_token}`
        }
      });

      await axios.patch(`/employee/${state.employee?.id}`, {
        role
      }, {
        headers: {
          Authorization: `Bearer ${state.access_token}`
        }
      });
      return;
    } catch (error){
      console.log(error);
    }
  }

  async function search(input: string) {
    const response = await axios.get(`/employee?search=${input}`, {
      headers: {
        Authorization: `Bearer ${state.access_token}`
      }
    });

    const obj: IEmployee[] = response.data;
    const parsed = obj.map((e)=>{
      return {
        value: e.id,
        label: `${e.registration} - ${e.name}`
      }
    });

    return parsed;
  }

  if(!isVisible)
    return null;

  return (
    <Container>
      {isRegister &&
      <Register method='POST' action='' onSubmit={e => handleSubmit(e)}>
        <AiOutlineClose onClick={() => onClose(false)} className='close-icon'/>
        <Select onChange={e => setType(e.target.value)}>
          <option value="" selected disabled>Tipo contrato</option>
          <option value={0}>CLT</option>
          <option value={1}>PJ</option>
        </Select>
        <DataField placeholder='Matricula' type='text' size={80} name='registration' value={registration} onChange={e => setRegistration(e.target.value)} />
        <DataField placeholder='Nome' type='text' name='name' value={name} onChange={e => setName(e.target.value)}/>
        <DataField placeholder='Cargo' type='text' name='role' value={role} onChange={e => setRole(e.target.value)}/>
        <DataField placeholder='Email' type='email' name='email' value={email} onChange={e => setEmail(e.target.value)}/>
        <DataField placeholder='Gmail' type='email' name='gmail' value={gmail} onChange={e => setGmail(e.target.value)}/>
        <label htmlFor="">Data de inicio na empresa</label>
        <DataField type='date' name='data_start' onChange={e => setDate(e.target.value)}/>
        <ModalButton type='submit'>Cadastrar</ModalButton>
      </Register>}

      {!isRegister &&
      <Register method='POST' action='' onSubmit={e => handleSubmit(e)}>
        <AiOutlineClose onClick={() => onClose(false)} className='close-icon'/>
        <AsyncSelect loadOptions={(e) => search(e)} onChange={(e) => setId(parseInt(e.value))} />
        <DataField placeholder='Função' onChange={(e) => setRole(e.target.value)} value={role}/>
        <Button cover={false}>Inserir</Button>
        <span>OU</span>
        <Button cover={false} onClick={() => setIsRegister(true)}>Cadastrar</Button>
      </Register>}
    </Container>
  );
}
