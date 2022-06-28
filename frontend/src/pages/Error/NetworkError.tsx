import Typography from "@mui/material/Typography";

type AxiosError = {
  message: string;
};

interface NetworkErrorProps {
  error: Error;
}

const NetworkError = ({ error }: NetworkErrorProps) => (
  <div style={{ margin: "20px", padding: "20px" }}>
    <Typography variant="h5">Network error...</Typography>
    <p>{error.message}</p>
  </div>
);

export default NetworkError;
