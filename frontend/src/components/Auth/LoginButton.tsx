import React from "react";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Account from "components/Auth/Account";
import { useMagicLogin } from "context/MagicLoginProvider";

interface LoginButtonProps {
    onClick: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const LoginButton = ({ onClick }: LoginButtonProps) => {
  const { isLoading, isAuthenticated, user } = useMagicLogin();

  if (isAuthenticated && user) {
    return (
      <div>
          <Account onClick={onClick} user={user} />
      </div>
    );
  } else {
    return (
      <Link to="/login" style={{ textDecoration: "none" }}>
        <LoadingButton loading={isLoading} variant="outlined">
          Sign in
        </LoadingButton>
      </Link>
    );
  }
};

export default LoginButton;
