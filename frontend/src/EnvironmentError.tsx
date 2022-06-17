import Typography from "@mui/material/Typography";

interface EnvironmentErrorProps {
    variables: Array<string>
}

const EnvironmentError = ({ variables }: EnvironmentErrorProps) => (
    <div style={{ margin: '20px', padding: '20px' }}>
        <Typography variant="h5">Some environment variables were not found:</Typography>
        <ul>
            {variables.map(variable => (<li>{variable}</li>))}
        </ul>
    </div>
);

export default EnvironmentError;
