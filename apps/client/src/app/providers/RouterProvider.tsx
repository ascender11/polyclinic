import { createBrowserRouter, RouterProvider as ReactRouterProvider } from 'react-router';

import { DoctorsPage } from '@/pages/doctors';
import { Home } from '@/pages/home';

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
]);

export const RouterProvider = () => <ReactRouterProvider router={router} />;
