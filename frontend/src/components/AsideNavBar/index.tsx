import React, { SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FaHome, FaUsersCog} from 'react-icons/fa';
import { AiFillPieChart } from 'react-icons/ai';
import { MdNotificationImportant, MdOutlineLogout } from 'react-icons/md';

import { Avatar, Info, NavContainer, Separator } from './styled';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/login.slice';

interface IAsideNavBar {
  // 1 -> manager | 0 -> employee
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

  const dispatch = useDispatch();
  const navigate = useNavigate()
  async function handleLogout(e: SyntheticEvent) {
    e.preventDefault();

    dispatch(logout);
    return navigate('/');
  }

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
        <Link to='notifications'><MdNotificationImportant />Notificações</Link>
        <div className="logout" onClick={e => handleLogout(e)}>
          <MdOutlineLogout /> <span>Logout</span>
        </div>
      </Separator>
    </NavContainer>
  );
}
