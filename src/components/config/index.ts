import axios from 'axios';

export const BASE_URL = 'https://fbivlx3nk3.execute-api.us-east-1.amazonaws.com/dev';

export const Todo_API_Endpoint = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});
