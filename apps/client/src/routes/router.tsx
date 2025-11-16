import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import RootLayout from 'layouts/rootLayout/RootLayout';
import ForYouPage from 'pages/forYouPage';
import RecentPage from 'pages/recentPage';
import SettingsPage from 'pages/settingsPage';
import TeamsPage from 'pages/teamsPage';
import { createBrowserRouter } from 'react-router-dom';

import type { RouteObject } from 'react-router-dom';

export type LinkAppRoute = RouteObject & {
  label?: string;
  type?: 'link';
  icon?: React.ElementType;
  children?: AppRoute[];
};

export type SectionAppRoute = RouteObject & {
  label?: string;
  type?: 'section';
  icon?: React.ElementType;
  children: AppRoute[];
};

export type AppRoute = LinkAppRoute | SectionAppRoute;

export type RootRoute = RouteObject & {
  children: AppRoute[];
};

export const appRoutes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'for-you',
        label: 'For you',
        type: 'link',
        icon: AccountCircleOutlinedIcon,
        element: <ForYouPage />,
      },
      {
        path: 'recent',
        label: 'Recent',
        type: 'link',
        icon: AccessTimeOutlinedIcon,
        element: <RecentPage />,
      },
      {
        path: 'spaces',
        label: 'Spaces',
        type: 'section',
        icon: PublicOutlinedIcon,
        children: [],
      },
      {
        path: 'teams',
        label: 'Teams',
        type: 'link',
        icon: PeopleAltOutlinedIcon,
        element: <TeamsPage />,
      },
      {
        path: 'settings',
        label: 'Settings',
        type: 'link',
        icon: SettingsOutlinedIcon,
        element: <SettingsPage />,
      },
    ] satisfies AppRoute[],
  },
] as const satisfies RootRoute[];

export const router = createBrowserRouter(appRoutes);
