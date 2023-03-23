import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './login.slice';


export default configureStore({
  reducer: {
    login: loginReducer
  }
});

