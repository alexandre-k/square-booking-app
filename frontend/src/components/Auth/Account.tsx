import React from "react";
import { MagicUserMetadata } from "magic-sdk";
import Button from "@mui/material/Button";

interface AccountProps {
  variant: "outlined" | "text" | "contained";
  onClick: (event: React.KeyboardEvent | React.MouseEvent) => void;
  user: MagicUserMetadata;
}
const Account = ({ variant, onClick, user }: AccountProps) => (
  <Button
    style={{ textTransform: "lowercase" }}
    variant={variant}
    onClick={onClick}
  >
    {user.email}
  </Button>
);

Account.defaultProps = {
  variant: "outlined",
};

export default Account;
