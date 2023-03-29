import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILogin } from '../types/ILogin';
import { ITeam } from '../types/ITeam';

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
    },
    insertTeam: (state, action: PayloadAction<ITeam>) => {
      state.team = action.payload;
    }
  }
});

export const { login, logout, insertTeam } = LoginSlice.actions;

export const selectLogin = (state: { login: any; }) => state.login;

export default LoginSlice.reducer;
