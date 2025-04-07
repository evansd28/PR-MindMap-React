import React from "react";
import PropTypes from "prop-types";
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  Chip,
  Typography,
  useTheme,
} from "@mui/material";
import { useAppContext } from "../../context/Context"; // import context

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  cursor: "pointer",
  whiteSpace: "nowrap",
  marginBottom: "2px",
  padding: "12px 16px",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
  },
  "&.Mui-selected": {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
}));

const NavItem = ({ item, level = 1, pathDirect, hideMenu = false }) => {
  const Icon = item.icon;
  const theme = useTheme();
  const { setSelectedValue } = useAppContext(); // grab setter

  const itemIcon =
    level > 1 ? (
      <Icon stroke={1.5} size="1rem" />
    ) : (
      <Icon stroke={1.5} size="1.3rem" />
    );

  return (
    <List component="li" disablePadding key={item.id}>
      <ListItemStyled
        button
        selected={pathDirect === item.href}
        onClick={() => setSelectedValue(item.node)} // context-driven click
      >
        <ListItemIcon
          sx={{
            minWidth: "36px",
            color:
              level > 1 && pathDirect === item.href
                ? theme.palette.primary.main
                : "inherit",
          }}
        >
          {itemIcon}
        </ListItemIcon>
        <ListItemText
          primary={
            hideMenu ? null : (
              <>
                {item.title}
                {item.subtitle && (
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    display="block"
                  >
                    {item.subtitle}
                  </Typography>
                )}
              </>
            )
          }
        />
        {!item.chip || hideMenu ? null : (
          <Chip
            color={item.chipColor}
            variant={item.variant || "filled"}
            size="small"
            label={item.chip}
          />
        )}
      </ListItemStyled>
    </List>
  );
};

NavItem.propTypes = {
  item: PropTypes.object.isRequired,
  level: PropTypes.number,
  pathDirect: PropTypes.string,
  hideMenu: PropTypes.bool,
};

export default NavItem;
