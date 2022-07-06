import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { useMagicLogin } from "context/MagicLoginProvider";
import "./Login.css";

const Login = () => {
  const { isLoading, isAuthenticated, error, user, login, logout } =
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
        <>
          <div>Oops... Unable to login!</div>
          <div>{error.message}</div>
        </>
      );
    }
  };

  useEffect(() => {
    if (isAuthenticated && !!user) {
      navigate("/profile");
    }
  });

  if (isLoading && !isAuthenticated) {
    return (
      <div className="loginBackground">
        <Card>
          <CardContent>Plase check your email</CardContent>
          {!!error && <CardContent>{getError()}</CardContent>}
        </Card>
      </div>
    );
  }

  return (
    <div className="loginBackground">
      <Card>
        <CardContent>
          <FormControl>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input
              id="email"
              aria-describedby="email-text"
              onChange={(e: any) => changeEmail(e)}
            />

            <Button
              id="loginButton"
              variant="outlined"
              onClick={() => login(email)}
            >
              Sign in
            </Button>
          </FormControl>
        </CardContent>
        {!!error && <CardContent>{getError()}</CardContent>}
      </Card>
    </div>
  );
};

export default Login;
