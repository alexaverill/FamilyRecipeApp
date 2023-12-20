import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions } from '@mui/material';

export default function ConfirmationDialog(props) {
  const { onClose, onConfirm, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Delete Recipe?</DialogTitle>
      <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Delete</Button>
        </DialogActions>
    </Dialog>
  );
}
