import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const SessionStartDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Welcome to Your First Session</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Welcome! This is your first session. Please note that the session will last for 45 minutes. 
          The timer will start when you begin. If at any point you'd like to end the session, just type 
          "quit" in the chat. We're here to help you, so feel free to talk about anything on your mind.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Start Session
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionStartDialog;
