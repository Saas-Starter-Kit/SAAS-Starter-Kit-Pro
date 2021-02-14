import { Users } from '../../../Database/mongo/models.js';

export const createCustomerModel = async (customer, email) => {
  await Users.findOneAndUpdate(
    { email },
    { $set: { stripe_customer_id: customer.id } },
    { useFindAndModify: false }
  );
  return { stripe_customer_id: customer.id };
};
