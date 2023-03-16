import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FaHome, FaUsersCog} from 'react-icons/fa';
import { Avatar, Info, NavContainer, Separator } from './styled';
import { AiFillPieChart } from 'react-icons/ai';

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
      <Separator>
        <Link to=''><FaHome />Página inicial</Link>
        <Link to='details'><FaUsersCog />Gerenciar equipe</Link>
        <Link to='dashboard'><AiFillPieChart />Dashboards</Link>
      </Separator>
    </NavContainer>
  );
}
