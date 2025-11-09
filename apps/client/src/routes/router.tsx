import { createBrowserRouter } from 'react-router-dom';

import RootLayout from 'src/layouts/rootLayout/RootLayout';
import Spaces from 'src/pages/spaces';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // errorElement: <NotFound />,
    children: [
      // { index: true, element: <BoardPage /> },
      // { path: 'backlog', element: <BacklogTable /> },
      { path: 'Spaces', element: <Spaces /> },
    ],
  },
]);
