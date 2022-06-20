import { useAuth0 } from "@auth0/auth0-react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (isAuthenticated && user) {
        return <Grid container alignItems="center" justifyContent="center">
            <Avatar sx={{ width: 56, height: 56 }} src={user.picture} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </Grid>
    }

    return (<div>Profile</div>);
        
};

export default Profile;
