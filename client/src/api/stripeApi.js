//API requests related to authentication
import axios from 'axios';

const createCustomer = async (userId, email) => {
  let data = { userId, email };

  let result = axios.post('http://localhost/stripe/customer', data);

  return result;
};
