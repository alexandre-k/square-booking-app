import { useState } from "react";
import TextField from "@mui/material/TextField";
import "./CustomerField.css";

interface CustomerProps {
  autoComplete: string;
  label: string;
  value: string;
  disabled?: boolean;
  type: string;
  onChange: (val: any) => void;
}

const CustomerField = ({
  autoComplete,
  label,
  value,
  disabled,
  type,
  onChange,
}: CustomerProps) => {
  const [dirty, setDirty] = useState(false);
  return (
    <TextField
      className="textField"
      disabled={disabled}
      required
      fullWidth
      autoComplete={autoComplete}
      error={dirty && value === ""}
      label={label}
      value={value}
      type={type}
      onBlur={() => setDirty(true)}
      onChange={onChange}
    />
  );
};

CustomerField.defaultProps = {
  disabled: false,
  type: "text",
};

export default CustomerField;
