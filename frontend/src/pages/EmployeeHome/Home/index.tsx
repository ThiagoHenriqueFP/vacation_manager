import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import AssideNavBar from '../../../components/AsideNavBar';
import { RootState } from '../../../store';

export default function EmployeeHome() {
  const state = useSelector((state: RootState) => state.login);

  if(!state.isLogged)
    return <Navigate to='/'/>;

  return (
    <>
      <AssideNavBar
        name={state.employee?.name ?? ""}
        team={state.team?.name ?? ""}
        subTeam={state.team?.sub_team}
        avatar="https://images.pexels.com/photos/262391/pexels-photo-262391.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <Outlet />
    </>
  )
}
