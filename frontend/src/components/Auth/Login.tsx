import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import { useMagicLogin } from "context/MagicLoginProvider";
import "./Login.css";

const Login = () => {
  const { isLoading, isAuthenticated, error, user, login } =
    useMagicLogin();
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const changeEmail = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setEmail(target.value);
  };

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
      navigate("/profile");
    }
  });

  return (
    <Box className="loginBackground">
      <Card id="loginCard">
        <CardContent id="loginCardContent">
          <FormControl sx={{ width: "100%", maxWidth: "250px" }}>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input
              id="email"
              readOnly={isLoading}
              aria-describedby="email-text"
              onChange={(e: any) => changeEmail(e)}
            />

            <LoadingButton
              id="loginButton"
              loading={isLoading}
              variant="outlined"
              onClick={() => login(email)}
            >
              Sign in
            </LoadingButton>
          </FormControl>
        </CardContent>
        {isLoading && <CardContent id="loginCardContent">
          <Alert severity="info">
            <AlertTitle>Check your mailbox</AlertTitle>A mail has been sent to
            you to authenticate.
          </Alert>
        </CardContent>}
        {!!error && <CardContent>{getError()}</CardContent>}
      </Card>
    </Box>
  );
};

export default Login;
