import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from '../../../services/axios';
import { RootState } from '../../../store';
import { insertTeam, login } from '../../../store/login.slice';
import { BackgroundLogin } from '../../Login/Styled';
import { ContainerCreateTeam, TeamButton, TeamInput } from './styled';

export default function CreateTeam() {
  const [name, setName] = useState("");
  const [subTeam, setSubTeam] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.login);

  async function handleSubmit(e:React.SyntheticEvent) {
    e.preventDefault();

    try {
      const response = await axios.post('team', {
        manager_id: state.employee?.id,
        name,
        subTeam
      }, {
        headers: {
          Authorization: `Bearer ${state.access_token}`
        }
      });

      localStorage.setItem('team',response.data.team.id.toString());
      dispatch(insertTeam(response.data))

      return navigate('/manager')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <BackgroundLogin>
      <ContainerCreateTeam onSubmit={e => handleSubmit(e)}>
        <h3>Quase lá, crie ou entre em uma equipe para iniciar o gerenciamento</h3>
        <form action="">
          <TeamInput type="text" placeholder='Nome do time' value={name} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setName(e.target.value)}/>
          <TeamInput type="text" placeholder='Sub divisão' value={subTeam} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSubTeam(e.target.value)}/>
          <TeamButton type='submit'>Cadastrar</TeamButton>
        </form>
      </ContainerCreateTeam>
    </BackgroundLogin>
  );
}
