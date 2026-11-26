import { createBrowserRouter, RouterProvider as ReactRouterProvider } from 'react-router';

import { DoctorsPage } from '@/pages/doctors';
import { Home } from '@/pages/home';
import { PatientsPage } from '@/pages/patients';

import { routes } from '@/shared/config';

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Home />,
  },
  {
    path: routes.doctors,
    element: <DoctorsPage />,
  },
  {
    path: routes.patients,
    element: <PatientsPage />,
  },
]);

export const RouterProvider = () => <ReactRouterProvider router={router} />;
