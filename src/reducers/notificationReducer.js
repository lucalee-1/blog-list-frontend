import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return (state = { text: action.payload.text, color: action.payload?.color || '#2e9551' });
    },
    clearNotification(state) {
      state = null;
      return state;
    },
  },
});

export const setNotification = (text, color, duration) => {
  return (dispatch) => {
    dispatch(showNotification({ text, color }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, duration || 5000);
  };
};

export const { showNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
