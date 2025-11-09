import { Toolbar } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import MenuContent from './menuContent';

const drawerWidth = 240;

export default function SideMenu() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .${drawerClasses.paper}`]: {
          width: drawerWidth,
        },
      }}
    >
      <Toolbar variant="dense" />

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <MenuContent />
      </Box>
    </Drawer>
  );
}
