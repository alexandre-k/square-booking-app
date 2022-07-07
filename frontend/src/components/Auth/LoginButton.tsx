import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import { useMagicLogin } from "context/MagicLoginProvider";

const LoginButton = () => {
  const { isLoading, isAuthenticated, error, user, logout } = useMagicLogin();

  if (isAuthenticated && user) {
    return (
      <div>
        <Button variant="outlined" onClick={() => logout()}>
          Log out
        </Button>
      </div>
    );
  } else {
    return (
      <Link to="login" style={{ textDecoration: "none" }}>
        <LoadingButton loading={isLoading} variant="outlined">
          Sign in
        </LoadingButton>
      </Link>
    );
  }
};

export default LoginButton;
