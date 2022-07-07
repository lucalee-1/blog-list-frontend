import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return (state = { text: action.payload.text, color: action.payload?.color, global: true });
    },
    showLocalNotification(state, action) {
      return (state = { text: action.payload.text, color: action.payload?.color, global: false });
    },
    clearNotification(state) {
      state = null;
      return state;
    },
  },
});

let timeoutId;

export const setNotification = (text, color, duration) => {
  return (dispatch) => {
    dispatch(showNotification({ text, color }));
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, duration || 6000);
  };
};

export const setLocalNotification = (text, color, duration) => {
  return (dispatch) => {
    dispatch(showLocalNotification({ text, color }));
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, duration || 6000);
  };
};

export const { showNotification, showLocalNotification, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
