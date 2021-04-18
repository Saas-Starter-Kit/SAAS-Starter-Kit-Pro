import axios from 'axios';

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 15000
});

export default Axios;
