import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const notificationStyle = {
    color: notification?.color || '#2e9551',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 3,
    padding: 10,
    marginBottom: 15,
  };

  return (
    <>
      {!notification ? null : (
        <div className="notification" style={notificationStyle}>
          <p>{notification.text}</p>
        </div>
      )}
    </>
  );
};

export default Notification;
