import { createBrowserRouter, RouterProvider as ReactRouterProvider } from 'react-router';

import { AppLayout } from '@/app/layout';
import { AppointmentsPage } from '@/pages/appointments';
import { DiagnosesPage } from '@/pages/diagnoses';
import { DoctorsPage } from '@/pages/doctors';
import { Home } from '@/pages/home';
import { PatientsPage } from '@/pages/patients';

import { routes } from '@/shared/config';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
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
      {
        path: routes.diagnoses,
        element: <DiagnosesPage />,
      },
      {
        path: routes.appointments,
        element: <AppointmentsPage />,
      },
    ],
  },
]);

export const RouterProvider = () => <ReactRouterProvider router={router} />;
