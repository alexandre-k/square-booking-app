import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import { useMagicLogin } from "context/MagicLoginProvider";
import CheckYourEmail from "components/Auth/CheckYourEmail";
import EmailConfirmed from "components/Auth/EmailConfirmed";
import EmailField from "components/Auth/EmailField";
import "./Login.css";

const Login = () => {
  const { isLoading, isAuthenticated, error, user, login } = useMagicLogin();
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const getError = () => {
    if (!!error) {
      return (
        <Alert severity="error">
          <AlertTitle>Oops.. Unable to login!</AlertTitle>
          {error.message}
        </Alert>
      );
    }
  };

  useEffect(() => {
    if (isAuthenticated && !!user) {
      navigate("/");
    }
  });

  return (
    <Box className="loginBackground">
      <Card id="loginCard">
        <CardContent id="loginCardContent">
          <FormControl sx={{ width: "100%", maxWidth: "250px" }}>
            <EmailField
              isLoading={isLoading}
              email={email}
              setEmail={setEmail}
            />
            <LoadingButton
              id="loginButton"
              loading={isLoading}
              variant="contained"
              onClick={() => login(email)}
            >
              Sign in
            </LoadingButton>
          </FormControl>
        </CardContent>
        {isLoading && (
          <CardContent id="loginCardContent">
            <CheckYourEmail email={email} />
          </CardContent>
        )}
        {isAuthenticated && (
          <CardContent id="loginCardContent">
              <EmailConfirmed email={email} />
          </CardContent>
        )}
        {!!error && <CardContent>{getError()}</CardContent>}
      </Card>
    </Box>
  );
};

export default Login;
