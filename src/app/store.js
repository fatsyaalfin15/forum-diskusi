import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import threadsReducer from '../features/threads/threadsSlice';
import threadDetailReducer from '../features/threadDetail/threadDetailSlice';
import leaderboardsReducer from '../features/leaderboards/leaderboardsSlice';
import loadingReducer from '../features/loading/loadingSlice';
import usersReducer from '../features/users/usersSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    loading: loadingReducer,
    users: usersReducer,
  },
});

export default store;
