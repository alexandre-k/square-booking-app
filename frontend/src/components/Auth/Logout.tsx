import { useMagicLogin } from "context/MagicLoginProvider";
import React from "react";

const LogoutButton = () => {
    const { logout } =
        useMagicLogin();
    

    return (
        <button onClick={() => logout()}>
            Log Out
        </button>
    );
};

export default LogoutButton;
