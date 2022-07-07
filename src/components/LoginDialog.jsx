import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import { Dialog, DialogContent, DialogTitle, Alert } from '@mui/material';

const LoginDialog = ({ open, setOpen }) => {
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
        <DialogTitle>Log In</DialogTitle>
        <DialogContent>
          <LoginForm closeDialog={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginDialog;
