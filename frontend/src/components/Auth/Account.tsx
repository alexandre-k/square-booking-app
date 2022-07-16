import React from "react";
import { MagicUserMetadata } from "magic-sdk";
import Button from "@mui/material/Button";

interface AccountProps {
  onClick: (event: React.KeyboardEvent | React.MouseEvent) => void;
  user: MagicUserMetadata;
}
const Account = ({ onClick, user }: AccountProps) => (
  <Button variant="outlined" onClick={onClick}>{user.email}</Button>
);

export default Account;
