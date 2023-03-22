import axios from 'axios';

export default axios.create({
  baseURL: 'http://127.0.0.1:3000',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Accept: '/',
  }
});
