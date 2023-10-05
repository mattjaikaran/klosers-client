import { createSlice } from '@reduxjs/toolkit';

const AUTH = 'auth';
const initialState = {
  user: {
    data: {},
    careerStats: [],
    ytdStats: [],
    awards: [],
  },
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: AUTH,
  initialState,
  reducers: {
    //Actions
    userLogin: (state, action) => {
      state.user = {
        ...state.user,
        data: action.payload,
      };
      state.isLoggedIn = true;
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
    userLogout: (state, action) => {
      console.log('action in userLogout', action);
      console.log('action.payload in userLogout', action.payload);
      state.user = {
        data: {},
        careerStats: [],
        ytdStats: [],
        awards: [],
      };
      state.isLoggedIn = false;
    },
  },
});

export const {
  userLogin,
  getUserCareerStats,
  getUserYTDStats,
  getUserAwards,
  userLogout,
} = authSlice.actions;

//Selectors - this is how we pull information from the global store slice
export const getUser = (state: typeof initialState) => state.user;
export default authSlice.reducer;
