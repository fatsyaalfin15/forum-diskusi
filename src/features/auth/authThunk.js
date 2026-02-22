import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthUser, clearAuthUser } from './authSlice';

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

export const asyncRegister = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }) => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
  }
);

export const asyncLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch }) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    localStorage.setItem('accessToken', responseJson.data.token);
    await dispatch(asyncGetOwnProfile());
  }
);

export const asyncGetOwnProfile = createAsyncThunk(
  'auth/getOwnProfile',
  async (_, { dispatch }) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const responseJson = await response.json();
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message);
      }
      dispatch(setAuthUser(responseJson.data.user));
    } catch (error) {
      dispatch(asyncLogout());
    }
  }
);

export const asyncLogout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    localStorage.removeItem('accessToken');
    dispatch(clearAuthUser());
  }
);
