import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Calendar from './pages/Manager/components/Calendar';

import './index.css';
import ErrorPage from './pages/ErrorPage';
import Detail from './pages/Manager/Detail';
import Home from './pages/Manager/Home';
import DashboardsPage from './pages/Manager/Dashboards';

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
        path: '',
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
    ],
  }
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
