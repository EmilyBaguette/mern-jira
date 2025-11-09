import Stack from '@mui/material/Stack';

import NavbarBreadcrumbs from '../navbarBreadcrumbs';

export default function Header() {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
    </Stack>
  );
}
