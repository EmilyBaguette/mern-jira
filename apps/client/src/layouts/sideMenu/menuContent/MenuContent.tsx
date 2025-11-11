import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

const mainListItems = [
  { text: 'For you', Icon: AccountCircleOutlinedIcon },
  { text: 'Recent', Icon: AccessTimeOutlinedIcon },
  { text: 'Spaces', Icon: PublicOutlinedIcon },
  { text: 'Teams', Icon: PeopleAltOutlinedIcon },
  { text: 'Settings', Icon: SettingsOutlinedIcon },
];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between', flex: 1 }}>
      <List dense>
        {mainListItems.map(({ text, Icon }, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
