import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILogin {
  access_token?: string;
  employee?: {
    id: number;
    name: string;
    type: number;
    registration: string;
    date_started: Date;
    isManager: boolean;
    manager_id: number;
  };
  team?: {
    id: number,
    name: string,
    sub_team?: string,
  }
  isLogged: boolean;
}

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
