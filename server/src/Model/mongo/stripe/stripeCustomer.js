import { Users } from '../../../Database/mongo/models.js';

export const createCustomerModel = async (customer, email) => {
  Users.findOneAndUpdate({ email }, { stripe_customer_id: customer.id });
  return customer.id;
};
