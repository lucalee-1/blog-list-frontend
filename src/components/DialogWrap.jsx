import { cloneElement } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogTitle, Alert } from '@mui/material';

const DialogWrap = ({ title = '', open, setOpen, children }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const notification = useSelector((state) => state.notification);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        {notification && !notification.global && (
          <Alert severity={notification.color}>{notification.text}</Alert>
        )}
        <DialogTitle variant="h5">{title}</DialogTitle>
        <DialogContent>{cloneElement(children, { closeDialog: handleClose })}</DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogWrap;
