import { useAuth0 } from '@auth0/auth0-react';

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
                Hello {user.name}{' '}
                <button onClick={() => logout({ returnTo: window.location.origin })}>
                    Log out
                </button>
            </div>
        );
    } else {
        return <button onClick={loginWithRedirect}>Log in</button>;
    }
}

export default Login;
