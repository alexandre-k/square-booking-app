import React from "react";
import Typography from "@mui/material/Typography";
import "./Header.css";

interface HeaderProps {
  icon: JSX.Element;
  title: string;
}
const Header = ({ icon, title }: HeaderProps) => (
  <div className="cardItem" role="row">
    {React.cloneElement(icon, { className: "itemIcon" })}
    <Typography variant="h6" role="heading">
      {title}
    </Typography>
  </div>
);

export default Header;
