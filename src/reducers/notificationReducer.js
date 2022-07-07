import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return (state = { text: action.payload.text, color: action.payload?.color });
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

export const { showNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
