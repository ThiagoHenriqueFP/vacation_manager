import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILogin } from '../types/ILogin';

let initialState: ILogin = {isLogged: false};

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action:PayloadAction<ILogin>)=> {
      state.access_token = action.payload.access_token;
      state.employee = action.payload.employee;
      state.team = action.payload.team;
      state.isLogged = true;

      return state;
    },
    logout: (state, action) => {
      state = {isLogged: false}
    }
  }
});

export const { login, logout } = LoginSlice.actions;

export const selectLogin = (state: { login: any; }) => state.login;

export default LoginSlice.reducer;
