import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";

interface ConfirmationDialogProps {
  open: boolean;
  setOpen: (opened: boolean) => void;
}

const ConfirmationDialog = ({ open, setOpen }: ConfirmationDialogProps) => (
  <Dialog open={open} onClose={() => setOpen(false)}>
    <DialogTitle id="responsive-dialog-title">
      Payment received
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
    <DialogContent style={{ minWidth: "300px", minHeight: "500px" }}>
      Payment Received
    </DialogContent>
  </Dialog>
);

export default ConfirmationDialog;
