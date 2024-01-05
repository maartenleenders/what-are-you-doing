import React from 'react'
import { Drawer, Box, List,ListItem, ListItemButton,ListItemIcon, ListItemText } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';

export const MENU_ITEMS = [{
    icon: <MailIcon />, 
    title: 'Log Entries'
}]

export type MainMenuProps = {
  width: number
}

export const MainMenu = ({ width }: MainMenuProps) => {

    return (
        <Drawer
        variant="permanent"
        sx={{
          width: width,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: width, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <List>
          {MENU_ITEMS.map(({icon, title}) => (
              <ListItem key={title} disablePadding>
                <ListItemButton selected>
                  <ListItemIcon>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

      </Drawer>

    )
}