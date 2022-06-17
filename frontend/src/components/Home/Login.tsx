import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const Login = () => {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated)
    return (
        <div>
        <Link to="profile">
            <IconButton
                color="secondary"
                aria-label="show location"
                component="span"
            >
                <AccountCircleIcon/>
            </IconButton>
        </Link>
      <Link to="logout">
          <IconButton
              color="secondary"
              aria-label="show location"
              component="span"
          >
              <LogoutIcon/>
          </IconButton>
      </Link>
        </div>
    );
  return (
    <Link to="login">
        <IconButton
            color="secondary"
            aria-label="show location"
            component="span"
        >
            <LoginIcon/>
        </IconButton>
    </Link>
  );
};

export default Login;
