import RootLayout from 'layouts/rootLayout/RootLayout';
import Spaces from 'pages/spaces';
import { createBrowserRouter } from 'react-router-dom';

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
