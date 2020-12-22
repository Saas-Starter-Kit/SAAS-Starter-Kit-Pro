//API requests related to authentication
import axios from 'axios';

export const createCustomer = async (userId, email) => {
  let data = { userId, email };

  let result = await axios.post('http://localhost/stripe/customer', data);

  return result;
};
