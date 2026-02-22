import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded';
    },
    clearAuthUser: (state) => {
      state.user = null;
      state.status = 'idle';
    },
  },
});

export const { setAuthUser, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;
