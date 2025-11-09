import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

export default function NavbarBreadcrumbs() {
  return (
    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextRoundedIcon fontSize="small" />}>
      <Typography variant="body1">Hard</Typography>
      <Typography variant="body1">Coded</Typography>
      <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
        Breadcrumbs
      </Typography>
    </Breadcrumbs>
  );
}
