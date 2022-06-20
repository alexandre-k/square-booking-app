import { useAuth0 } from '@auth0/auth0-react';
import Button from "@mui/material/Button";

const Login = () => {
    const {
        isLoading,
        isAuthenticated,
        error,
        user,
        loginWithRedirect,
        logout,
    } = useAuth0<{ name: string }>();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Oops... {error.message}</div>;
    }
    if (isAuthenticated && user) {
        return (
            <div>
                <Button variant="outlined" onClick={() => logout({ returnTo: window.location.origin })}>
                    Log out
                </Button>
            </div>
        );
    } else {
        return <Button variant="outlined" onClick={loginWithRedirect}>Sign in</Button>;
    }
}

export default Login;
