import { createSlice } from '@reduxjs/toolkit';
import { fetchThreadDetail, addComment } from './threadDetailThunk';

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: {
    data: null,
    error: null,
  },
  reducers: {
    clearThreadDetail(state) {
      state.data = null;
    },
  },
  extraReducers(builder) {
    builder

      .addCase(fetchThreadDetail.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchThreadDetail.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(addComment.pending, (state) => {
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (state.data) {
          state.data.comments.unshift(action.payload);
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { clearThreadDetail } = threadDetailSlice.actions;
export default threadDetailSlice.reducer;
