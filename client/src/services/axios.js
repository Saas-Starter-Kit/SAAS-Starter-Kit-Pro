import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost',
  timeout: 15000
});

export default Axios;
