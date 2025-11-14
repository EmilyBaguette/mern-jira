import { Fragment, useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';
import { appRoutes } from 'routes/router';
import type { AppRoute, LinkAppRoute, SectionAppRoute } from 'routes/router';

export default function MenuContent() {
  const rootRoute = appRoutes[0];
  const navItems = rootRoute.children;

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (path: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const renderLinkItem = (route: LinkAppRoute, parentPath?: string) => {
    const Icon = route.icon;
    const fullPath = parentPath
      ? `/${parentPath}/${route.path}`.replace('//', '/')
      : `/${route.path}`.replace('//', '/');

    return (
      <ListItem key={fullPath} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          component={NavLink}
          to={fullPath}
          sx={{
            '&.active': {
              bgcolor: 'action.selected',
            },
          }}
        >
          {Icon && (
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Icon fontSize="small" />
            </ListItemIcon>
          )}
          <ListItemText primary={route.label} />
        </ListItemButton>
      </ListItem>
    );
  };

  const renderSectionItem = (route: SectionAppRoute) => {
    const Icon = route.icon;
    const isOpen = openSections[route.path ?? ''] ?? true; // default to open

    return (
      <Fragment key={route.path}>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton onClick={() => toggleSection(route?.path ?? '')}>
            {Icon && (
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Icon fontSize="small" />
              </ListItemIcon>
            )}
            <ListItemText primary={route.label} />
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            {route.children.map((child) => renderLinkItem(child as LinkAppRoute, route.path))}
          </List>
        </Collapse>
      </Fragment>
    );
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between', flex: 1 }}>
      <List dense>
        {navItems.map((route: AppRoute) => {
          if (route.type === 'link') {
            return renderLinkItem(route as LinkAppRoute);
          }
          return renderSectionItem(route as SectionAppRoute);
        })}
      </List>
    </Stack>
  );
}
