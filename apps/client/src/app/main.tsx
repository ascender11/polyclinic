import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from './providers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider />
  </StrictMode>
);
