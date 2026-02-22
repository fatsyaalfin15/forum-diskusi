import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../services/api';
import { showLoading, hideLoading } from '../loading/loadingSlice';

export const fetchLeaderboards = createAsyncThunk(
  'leaderboards/fetch',
  async (_, { dispatch }) => {
    dispatch(showLoading());
    try {
      const res = await fetch(`${BASE_URL}/leaderboards`);
      const data = await res.json();
      if (data.status !== 'success') {
        throw new Error(data.message);
      }
      return data.data.leaderboards;
    } finally {
      dispatch(hideLoading());
    }
  },
);
