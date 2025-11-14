import { Box, Stack, Toolbar } from '@mui/material';
import AppNavbar from 'layouts/appNavBar';
import Header from 'layouts/header';
import SideMenu from 'layouts/sideMenu';
import { Outlet, ScrollRestoration } from 'react-router-dom';

export default function RootLayout() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppNavbar />
        <SideMenu />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            overflow: 'auto',
            minHeight: '100vh',
          })}
        >
          <Stack spacing={2} sx={{ alignItems: 'center', mx: 3, pb: 5, mt: { xs: 8, md: 0 } }}>
            <Toolbar variant="dense" />
            <Header />
            <Outlet />
          </Stack>
        </Box>
      </Box>
      <ScrollRestoration />
    </>
  );
}
