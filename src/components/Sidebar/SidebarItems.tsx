import React from "react";
import useMenuItems from "./MenuItems";
import { useLocation } from "react-router-dom";
import { Box, List, useMediaQuery, useTheme } from "@mui/material";
import NavItem from "./NavItem";
import NavCollapse from "./NavCollapse";
import NavGroup from "./NavGroup";

const SidebarItems = () => {
  const menuItems = useMenuItems(); // Get menu items from context
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf("/"));

  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const hideMenu = false; // You can tie this to state if you add a collapsible sidebar

  return (
    <Box
      sx={{
        px: 2,
        pt: 4,
        height: "auto",
        maxHeight: "100%",
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.8, // Vertical spacing between list items
          ".MuiListItem-root": {
            py: 1.2, // More vertical padding inside items
            px: 2, // Optional: horizontal padding
            borderRadius: 1.5,
            transition: "all 0.2s ease",
          },
          ".MuiListItemText-root": {
            my: 0,
          },
          ".MuiTypography-root": {
            fontSize: "0.875rem",
          },
        }}
        className="sidebarNav"
      >
        {menuItems.map((item, index) => {
          if (item.navlabel) {
            return (
              <NavGroup
                item={item}
                hideMenu={hideMenu}
                key={`group-${index}`}
              />
            );
          } else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
              />
            );
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
