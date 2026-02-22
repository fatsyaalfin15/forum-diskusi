import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

export const fetchThreads = createAsyncThunk(
  'threads/fetch',
  async () => {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.threads;
  }
);

export const createThread = createAsyncThunk(
  'threads/create',
  async ({ title, body, category }) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Anda harus login untuk membuat thread.');
    }

    const response = await fetch(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title, body, category }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.thread;
  }
);

export const asyncUpVote = createAsyncThunk(
  'threads/upVote',
  async (threadId) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Anda harus login untuk melakukan vote.');
    }

    const response = await fetch(`${BASE_URL}/threads/${threadId}/up-vote`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.vote;
  }
);

export const asyncDownVote = createAsyncThunk(
  'threads/downVote',
  async (threadId) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Anda harus login untuk melakukan vote.');
    }

    const response = await fetch(`${BASE_URL}/threads/${threadId}/down-vote`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.vote;
  }
);

export const asyncNeutralVote = createAsyncThunk(
  'threads/neutralVote',
  async (threadId) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Anda harus login untuk melakukan vote.');
    }

    const response = await fetch(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.vote;
  }
);
