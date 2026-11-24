import { createBrowserRouter, RouterProvider as ReactRouterProvider } from 'react-router';

import { Home } from '@/pages/home';

import { routes } from '@/shared/config';

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Home />,
  },
]);

export const RouterProvider = () => <ReactRouterProvider router={router} />;
