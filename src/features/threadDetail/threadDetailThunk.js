import { createAsyncThunk } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from '../loading/loadingSlice';

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

export const fetchThreadDetail = createAsyncThunk(
  'threadDetail/fetch',
  async (id, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await fetch(`${BASE_URL}/threads/${id}`);
      const responseJson = await response.json();
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message);
      }
      return responseJson.data.detailThread;
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const addComment = createAsyncThunk(
  'threadDetail/addComment',
  async ({ id, content }, { dispatch }) => {
    dispatch(showLoading());
    const token = localStorage.getItem('accessToken');
    if (!token) {
      dispatch(hideLoading());
      throw new Error('Anda harus login untuk berkomentar.');
    }
    try {
      const response = await fetch(`${BASE_URL}/threads/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });
      const responseJson = await response.json();
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message);
      }
      return responseJson.data.comment;
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const asyncUpVoteComment = createAsyncThunk(
  'threadDetail/upVoteComment',
  async ({ threadId, commentId }, { dispatch }) => {
    dispatch(showLoading());
    const token = localStorage.getItem('accessToken');
    if (!token) {
      dispatch(hideLoading());
      throw new Error('Anda harus login untuk vote.');
    }
    try {
      const response = await fetch(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const responseJson = await response.json();
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message);
      }
      dispatch(fetchThreadDetail(threadId));
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const asyncDownVoteComment = createAsyncThunk(
  'threadDetail/downVoteComment',
  async ({ threadId, commentId }, { dispatch }) => {
    dispatch(showLoading());
    const token = localStorage.getItem('accessToken');
    if (!token) {
      dispatch(hideLoading());
      throw new Error('Anda harus login untuk vote.');
    }
    try {
      const response = await fetch(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const responseJson = await response.json();
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message);
      }
      dispatch(fetchThreadDetail(threadId));
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const asyncNeutralVoteComment = createAsyncThunk(
  'threadDetail/neutralVoteComment',
  async ({ threadId, commentId }, { dispatch }) => {
    dispatch(showLoading());
    const token = localStorage.getItem('accessToken');
    if (!token) {
      dispatch(hideLoading());
      throw new Error('Anda harus login untuk vote.');
    }
    try {
      const response = await fetch(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const responseJson = await response.json();
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message);
      }
      dispatch(fetchThreadDetail(threadId));
    } finally {
      dispatch(hideLoading());
    }
  },
);
