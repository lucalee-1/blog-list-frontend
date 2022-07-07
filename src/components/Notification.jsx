import { useSelector, useDispatch } from 'react-redux';
import { Alert } from '@mui/material';
import { clearNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const color = notification?.color || 'success';

  return (
    <>
      {(!notification || !notification?.global) ? null : (
        <Alert severity={color} onClose={() => dispatch(clearNotification())}>
          {notification.text}
        </Alert>
      )}
    </>
  );
};

export default Notification;
