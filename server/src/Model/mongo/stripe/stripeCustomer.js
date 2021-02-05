import { Users } from '../../../Database/mongo/models.js';

export const createCustomerModel = async (customer, email) => {
  let result = Users.findOneAndUpdate({ email }, { stripe_customer_id: customer.id });
  console.log(result);
  return customer.id;
};
