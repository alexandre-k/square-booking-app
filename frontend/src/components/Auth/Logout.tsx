import { useMagicLogin } from "context/MagicLoginProvider";
import Button from "@mui/material/Button";
import React from "react";

const LogoutButton = () => {
    const { logout } =
        useMagicLogin();

    return (
        <Button onClick={() => logout()}>
            Log Out
        </Button>
    );
};

export default LogoutButton;
