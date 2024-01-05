import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";

export const MENU_ITEMS = [
  {
    icon: <MailIcon />,
    name: "logEntries",
    title: "Log Entries",
  },
  {
    icon: <MailIcon />,
    name: "workOverview",
    title: "Work overview",
  },
];

export type MainMenuProps = {
  width: number;
  setActivePage: (page: string) => void;
};

export const MainMenu = ({ width, setActivePage }: MainMenuProps) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: width,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: width, boxSizing: "border-box" },
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          {MENU_ITEMS.map(({ icon, title, name }) => (
            <ListItem key={title} disablePadding>
              <ListItemButton
                selected
                onClick={() => {
                  setActivePage(name);
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
