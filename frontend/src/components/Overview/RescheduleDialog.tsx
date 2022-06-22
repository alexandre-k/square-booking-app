import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { BusinessHours } from "types/Location";
import DateTimePicker from "components/Booking/DateTimePicker";

interface RescheduleDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const RescheduleDialog = ({ open, setOpen }: RescheduleDialogProps) => {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<Array<string>>([]);
  const [selectedStartAt, setSelectedStartAt] = useState<string | null>(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Pick a different date and time"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <DateTimePicker
            selectedServices={selectedServices}
            memberId={selectedMemberId}
            selectedStartAt={selectedStartAt}
            setSelectedStartAt={setSelectedStartAt}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Keep my last schedule
        </Button>
        <Button onClick={handleClose} autoFocus>
          Choose this new schedule
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RescheduleDialog;
