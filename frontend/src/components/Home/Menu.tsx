import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { useMagicLogin } from "context/MagicLoginProvider";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Account from "components/Auth/Account";

type MenuRoute = {
  name: string;
  to: string;
  icon: JSX.Element;
};

interface MenuProps {
  logout: () => void;
  toggleDrawer: (toggled: boolean) => void;
  menuRoutes: Array<MenuRoute>;
}

const Menu = ({ menuRoutes, logout, toggleDrawer }: MenuProps) => {
  const { isLoading, isAuthenticated, user } = useMagicLogin();

  return (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <List>
        {!!user && (
          <>
            <ListItem>
                <ListItemButton>
                <ListItemIcon sx={{ width: "20px" }}>
                  <AccountCircleIcon fontSize="large" />
                </ListItemIcon>
                <Account user={user} variant="text" onClick={() => {}} />
              </ListItemButton>
            </ListItem>

            <Divider />
          </>
        )}
        {menuRoutes.map((route, index) => (
          <Link key={route.to} to={route.to} style={{ textDecoration: "none" }}>
            <ListItem key={route.name} disablePadding>
              <ListItemButton>
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => logout()}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Menu;
