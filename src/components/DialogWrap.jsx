import { cloneElement } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogTitle, Alert } from '@mui/material';

const DialogWrap = ({ title = '', open, setOpen, children }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const notification = useSelector((state) => state.notification);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        {notification && !notification.global && (
          <Alert severity={notification.color}>{notification.text}</Alert>
        )}
        <DialogTitle variant="h5">{title}</DialogTitle>
        <DialogContent
          sx={{
            '& .MuiTextField-root': { m: 1, width: { xs: '30ch', sm: '50ch' } },
          }}
        >
          {cloneElement(children, { closeDialog: handleClose })}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogWrap;
