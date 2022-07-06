import { useMagicLogin } from "context/MagicLoginProvider";
import UserAvatar from "components/User/UserAvatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import "./Profile.css";

const Profile = () => {
  const { isLoading, isAuthenticated, error, user, login, logout } =
    useMagicLogin();

  if (isLoading) {
    return (
      <div className="profileBackground">
        <div>Loading ...</div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="profileBackground">
        <Grid container alignItems="center" justifyContent="center">
          <Card>
            <CardContent>
              <UserAvatar letters={user.email} />
              <h2>{user.email}</h2>
              <p>Public address: {user.publicAddress}</p>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }

  return <div>Profile</div>;
};

export default Profile;
