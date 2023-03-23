import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import AssideNavBar from '../../../components/AsideNavBar';
import { RootState } from '../../../store';

export default function Home () {
  const state: any = useSelector((state: RootState) => state.login);

  if(!state.isLogged)
    return <Navigate to='/'/>;

  return (
    <>
      {/* <GlobalHeader title='Gestão de colaboradores'/> */}
      <AssideNavBar
        avatar='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'
        name={state.employee.name ?? 'nome'}
        team={state.team?.name ?? 'team'}
        subTeam={state.team?.sub_team ?? 'subteam'}
      />
      <Outlet />
    </>
  );
}
