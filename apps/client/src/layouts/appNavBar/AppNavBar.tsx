import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function AppNavbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        top: 'var(--template-frame-height, 0px)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar variant="dense">
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            flexGrow: 1,
            width: '100%',
            gap: 1,
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignContent: 'center', mr: 'auto' }}>
            <DoubleArrowOutlinedIcon
              sx={{ bgcolor: 'primary.main', borderRadius: 2, height: '28px', width: '28px' }}
            />
            <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
              Tiny Ticket
            </Typography>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
