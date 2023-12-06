import { createSlice } from '@reduxjs/toolkit';

const USER = 'user';
const initialState = {
  user: {
    data: {},
    stats: [],
    awards: [],
  },
};

export const userSlice = createSlice({
  name: USER,
  initialState,
  reducers: {
    //Actions
    userDetails: (state, action) => {
      state.user = {
        ...state.user,
        data: action.payload,
      };
    },
    getUserStats: (state, action) => {
      state.user = {
        ...state.user,
        stats: action.payload,
      };
    },
    getUserAwards: (state, action) => {
      state.user = {
        ...state.user,
        awards: action.payload,
      };
    },
  },
});

export const { userDetails, getUserStats, getUserAwards } = userSlice.actions;

export const selectUser = (state: typeof initialState) => state.user;

export default userSlice.reducer;
