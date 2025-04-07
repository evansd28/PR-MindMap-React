import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import {
  ListItemIcon,
  ListItem,
  Collapse,
  styled,
  ListItemText,
  useTheme,
} from "@mui/material";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

import NavItem from "./NavItem";

// Styled outside the render
const ListItemStyled = styled(ListItem)(({ theme }) => ({
  marginBottom: "2px",
  padding: "8px 10px",
  whiteSpace: "nowrap",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const NavCollapse = ({
  menu,
  level = 1,
  pathWithoutLastPart,
  pathDirect,
  onClick,
  hideMenu = false,
}) => {
  const Icon = menu.icon;
  const theme = useTheme();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const menuIcon = <Icon stroke={1.5} size={level > 1 ? "1rem" : "1.3rem"} />;

  const handleClick = () => {
    setOpen(!open);
  };

  // Open if a child matches the current route
  useEffect(() => {
    setOpen(false);
    menu.children.forEach((item) => {
      if (item.href === pathname) {
        setOpen(true);
      }
    });
  }, [pathname, menu.children]);

  const submenus = menu.children?.map((item) =>
    item.children ? (
      <NavCollapse
        key={item.id}
        menu={item}
        level={level + 1}
        pathWithoutLastPart={pathWithoutLastPart}
        pathDirect={pathDirect}
        hideMenu={hideMenu}
        onClick={onClick}
      />
    ) : (
      <NavItem
        key={item.id}
        item={item}
        level={level + 1}
        pathDirect={pathDirect}
        hideMenu={hideMenu}
        onClick={onClick}
      />
    )
  );

  return (
    <React.Fragment key={menu.id}>
      <ListItemStyled
        button
        component="li"
        onClick={handleClick}
        selected={pathWithoutLastPart === menu.href}
        sx={{
          paddingLeft: hideMenu
            ? "10px"
            : level > 2
            ? `${level * 15}px`
            : "10px",
          backgroundColor: open && level < 2 ? theme.palette.primary.main : "",
          color: open && level < 2 ? "white" : theme.palette.text.secondary,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: "36px",
            p: "3px 0",
            color: "inherit",
          }}
        >
          {menuIcon}
        </ListItemIcon>
        <ListItemText>{hideMenu ? "" : menu.title}</ListItemText>
        {open ? <IconChevronUp size="1rem" /> : <IconChevronDown size="1rem" />}
      </ListItemStyled>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {submenus}
      </Collapse>
    </React.Fragment>
  );
};

NavCollapse.propTypes = {
  menu: PropTypes.object.isRequired,
  level: PropTypes.number,
  pathDirect: PropTypes.string,
  pathWithoutLastPart: PropTypes.string,
  hideMenu: PropTypes.bool,
  onClick: PropTypes.func,
};

export default NavCollapse;
