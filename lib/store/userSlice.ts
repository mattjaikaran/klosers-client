import { createSlice } from '@reduxjs/toolkit';

const USER = 'user';
const initialState = {
  user: {
    data: {},
    careerStats: [],
    ytdStats: [],
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
    getUserCareerStats: (state, action) => {
      state.user = {
        ...state.user,
        careerStats: action.payload,
      };
    },
    getUserYTDStats: (state, action) => {
      state.user = {
        ...state.user,
        ytdStats: action.payload,
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

export const {
  userDetails,
  getUserCareerStats,
  getUserYTDStats,
  getUserAwards,
} = userSlice.actions;

export const selectUser = (state: typeof initialState) => state.user;

export default userSlice.reducer;
