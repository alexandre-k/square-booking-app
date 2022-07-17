import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';

interface EditDialogProps {
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
  save: () => void;
}

const EditDialog = ({
  title,
  open,
  setOpen,
  children,
  save
}: EditDialogProps) => {

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Dialog
        id="dialogContainer"
      open={open}
      onClose={handleCancel}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
          {title}
          <IconButton
              aria-label="close"
              onClick={handleCancel}
              sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
              }}
          >
              <CloseIcon />
          </IconButton>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => save()}
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
