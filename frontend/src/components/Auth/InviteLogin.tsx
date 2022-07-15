import { useMagicLogin } from "context/MagicLoginProvider";
import LoginButton from "components/Auth/LoginButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import "./InviteLogin.css";

const InviteLogin = () => {
  return (
    <div id="loginContainer">
      <Card id="loginCard">
        <CardHeader title="You need to login first to see this page." />
        <CardContent>
          <LoginButton onClick={() => { console.log('Do nothing')}} />
        </CardContent>
      </Card>
    </div>
  );
};

export default InviteLogin;
