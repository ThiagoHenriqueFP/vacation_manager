import React from 'react';
import { Outlet } from 'react-router-dom';

import AssideNavBar from '../../../components/AsideNavBar';

export default function Home () {
  return (
    <>
      {/* <GlobalHeader title='Gestão de colaboradores'/> */}
      <AssideNavBar
        avatar='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'
        name='Thiago Henrique Fonseca Pereira'
        team='Mercantil'
        type={1}
        employeeOnTeam={6}
        employeeOnVacation={2}
        subTeam='web'
      />
      <Outlet />
    </>
  );
}
