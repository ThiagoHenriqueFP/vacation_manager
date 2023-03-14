import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../DefaultButton';
import { Avatar, Info, NavContainer, Separator } from './styled';

interface IAsideNavBar {
  // 1 -> manager | 0 -> employee
  type: number;
  name: string;
  team: string;
  avatar: string;

  subTeam?: string;
  employeeOnTeam?: number;
  employeeOnVacation?: number;
}

export default function AssideNavBar({
  avatar,
  name,
  team,
  subTeam,
}:IAsideNavBar ) {

  return (
    <NavContainer>
      <Avatar src={avatar}/>
      <Separator>
        <Info>{name}</Info>
        <Info>Equipe: <Info className='strong'>{team} {subTeam}</Info> </Info>
      </Separator>

      <Link to='details'><Button>Gerenciar Colaboradores</ Button></Link>

      {/* Button to ModalEmployeeRegister
      <Button
        cover={false}
        onClick={()=> {
          setIsVisible(true);
        }}
      >
        Cadastrar Colaborador
      </Button>

      <ModalRegisterEmployee
        onClose={() => setIsVisible(false)}
        isVisible={isVisible}
      /> */}
    </NavContainer>
  );
}
