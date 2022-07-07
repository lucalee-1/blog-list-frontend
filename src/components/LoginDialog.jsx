import LoginForm from './LoginForm';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const LoginDialog = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Log In</DialogTitle>
        <DialogContent>
          <LoginForm closeDialog={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginDialog;
