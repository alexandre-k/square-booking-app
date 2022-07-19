import React from "react";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import Account from "components/Auth/Account";
import AccountAvatar from "components/Auth/AccountAvatar";
import { useMagicLogin } from "context/MagicLoginProvider";

interface LoginButtonProps {
  isAvatar: boolean;
  onClick: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const LoginButton = ({ isAvatar, onClick }: LoginButtonProps) => {
  const { isLoading, isAuthenticated, user } = useMagicLogin();

  // email can be null
  if (isAuthenticated && user && user.email !== null) {
    return (
      <div>
        {isAvatar ? (
          <AccountAvatar user={user} />
        ) : (
          <Account onClick={onClick} user={user} />
        )}
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

LoginButton.defaultProps = {
  isAvatar: false,
};

export default LoginButton;
