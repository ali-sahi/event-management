import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

const SessionModal = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate("/login");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Session Expired</DialogTitle>
      <DialogContent>
        <DialogContentText>Your session has expired</DialogContentText>
        <DialogContentText>You will be redirected to the login page</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionModal;
