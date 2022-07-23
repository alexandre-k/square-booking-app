import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

interface ConfirmationDialogProps {
  open: boolean;
  setOpen: (opened: boolean) => void;
}

const ConfirmationDialog = ({ open, setOpen }: ConfirmationDialogProps) => (
  <Dialog open={open} onClose={() => setOpen(false)}>
    <DialogTitle id="responsive-dialog-title">
      <IconButton
        aria-label="close"
        onClick={() => {
          setOpen(false);
        }}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent style={{ maxWidth: "300px", minHeight: "400px" }}>
      <Stack
        style={{ minHeight: "inherit" }}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <CheckCircleIcon color="success" sx={{ fontSize: 100 }} />
        <Typography variant="h4">Payment complete</Typography>
        <Typography style={{ margin: "1em" }} variant="body1">
          Your order has been placed. You will receive a receipt in your
          mailbox.
        </Typography>
      </Stack>
    </DialogContent>
  </Dialog>
);

export default ConfirmationDialog;
