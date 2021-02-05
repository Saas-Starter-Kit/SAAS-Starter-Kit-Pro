import db from '../../../Database/sql/db.js';

export const createCustomerModel = async (customer, email) => {
  let text = `UPDATE users SET stripe_customer_id=$1 
              WHERE email=$2
              RETURNING stripe_customer_id`;
  let values = [customer.id, email];

  //save stripe customer id to database
  let queryResult = await db.query(text, values);

  return queryResult.rows[0];
};
