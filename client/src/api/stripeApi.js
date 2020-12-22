//API requests related to authentication
import axios from 'axios';

export const createCustomer = async (userId, email) => {
  let data = { userId, email };

  let result = await axios.post('http://localhost/stripe/create-customer', data);

  return result;
};

//export const getCustomer = async (userId) => {
//  let data = { userId };

//  let result = await axios.post('http://localhost/stripe/get-customer', data);

//  return result;
//};

export const createSubscription = async (payment_method, customer, planSelect) => {
  let data = { payment_method, customer, planSelect };

  let result = await axios.post('http://localhost/stripe/create-subscription', data);

  return result;
};
