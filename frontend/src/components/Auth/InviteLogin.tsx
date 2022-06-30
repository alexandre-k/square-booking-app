import { useAuth0 } from "@auth0/auth0-react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import "./InviteLogin.css";

const InviteLogin = () => {
  const { loginWithRedirect } = useAuth0<{
    name: string;
  }>();
  return (
    <div id="loginContainer">
      <Card id="loginCard">
        <CardHeader title="You need to login first to see this page." />
        <CardContent>
          <Button variant="contained" onClick={loginWithRedirect}>
            Sign in
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InviteLogin;
