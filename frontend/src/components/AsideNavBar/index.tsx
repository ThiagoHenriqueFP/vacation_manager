import React, { useState } from 'react';
import ModalRegisterEmployee from '../../pages/Manager/ModalRegisterEmployee';
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
  type,
  employeeOnTeam,
  employeeOnVacation,
  subTeam,
}:IAsideNavBar ) {

  const [isVisible, setIsVisible] = useState<boolean>(false);


  return (
    <NavContainer>
      <Avatar src={avatar}/>
      <Separator>
        <Info>{name}</Info>
        <Info>Equipe: <Info className='strong'>{team} {subTeam}</Info> </Info>
      </Separator>

      <Separator>
        {type
          ? <Info small>Colaboradores na equipe: {employeeOnTeam}</Info>
          : ''
        }

        {type
          ? <Info small>Colaboradores de ferias: {employeeOnVacation}</Info>
          : ''
        }
      </Separator>

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
      />
    </NavContainer>
  );
}
