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
    updateMyUserDetails: (state, action) => {
      state.user = {
        ...state.user,
        data: action.payload,
      };
    },
    getMyUserCareerStats: (state, action) => {
      state.user = {
        ...state.user,
        careerStats: action.payload,
      };
    },
    getMyUserYTDStats: (state, action) => {
      state.user = {
        ...state.user,
        ytdStats: action.payload,
      };
    },
    getMyUserAwards: (state, action) => {
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
  updateMyUserDetails,
  getMyUserCareerStats,
  getMyUserYTDStats,
  getMyUserAwards,
  userLogout,
} = authSlice.actions;

//Selectors - this is how we pull information from the global store slice
export const getMyUser = (state: typeof initialState) => state.user;
export default authSlice.reducer;
