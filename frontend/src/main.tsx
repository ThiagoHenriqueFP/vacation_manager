import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store  from './store';
import App from './App';

import './index.css';
import Calendar from './pages/Manager/components/Calendar';
import ErrorPage from './pages/ErrorPage';
import Detail from './pages/Manager/Detail';
import Home from './pages/Manager/Home';
import DashboardsPage from './pages/Manager/Dashboards';
import NotificationPage from './pages/Manager/Notification';
import CreateTeam from './pages/Manager/CreateTeam';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: 'manager',
    element: <Home />,
    children: [
      {
        index: true,
        element: <Calendar />
      },
      {
        path: 'details',
        element: <Detail />
      },
      {
        path: 'dashboard',
        element: <DashboardsPage />
      },
      {
        path: 'notifications',
        element: <NotificationPage />
      }
    ],
  },
  {
    path: 'manager/team',
    element: <CreateTeam />
  }
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
