import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

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
