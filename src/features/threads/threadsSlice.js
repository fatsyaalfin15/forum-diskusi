import { createSlice } from '@reduxjs/toolkit';
import { fetchThreads, createThread } from './threadsThunk';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    data: [],
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createThread.pending, (state) => {
        state.error = null;
      })
      .addCase(createThread.fulfilled, () => {})
      .addCase(createThread.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default threadsSlice.reducer;
