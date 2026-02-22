import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://forum-api.dicoding.dev/v1/users');
  const responseJson = await response.json();
  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }
  return responseJson.data.users;
});
