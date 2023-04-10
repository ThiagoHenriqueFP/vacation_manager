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
  isManager: boolean;
  name: string;
  subTeam: string;
  team: string;
  avatar: string;
}

export default function AssideNavBar({
  avatar,
  name,
  team,
  subTeam,
  isManager,
}:IAsideNavBar ) {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  async function handleLogout(e: SyntheticEvent) {
    e.preventDefault();

    dispatch(logout);
    return navigate('/');
  }

  function managerOptions () {
    return (
      <Separator>
        <Link to=''><FaHome />Página inicial</Link>
        <Link to='details'><FaUsersCog />Gerenciar equipe</Link>
        <Link to='dashboard'><AiFillPieChart />Dashboards</Link>
        <Link to='notifications'><MdNotificationImportant />Notificações</Link>
        <div className="logout" onClick={e => handleLogout(e)}>
          <MdOutlineLogout /> <span>Logout</span>
        </div>
      </Separator>
    );
  }

  function employeeOptions () {
    return (
      <Separator>
        <div className="logout" onClick={e => handleLogout(e)}>
          <MdOutlineLogout /> <span>Logout</span>
        </div>
      </Separator>
    );
  }

  return (
    <NavContainer>
      <Avatar src={avatar}/>
      <Separator>
        <Info>{name}</Info>
        <Info>Equipe: <Info className='strong'>{`${team} ${subTeam??''}`}</Info> </Info>
      </Separator>
      {isManager ? managerOptions() : employeeOptions()}
    </NavContainer>
  );
}
