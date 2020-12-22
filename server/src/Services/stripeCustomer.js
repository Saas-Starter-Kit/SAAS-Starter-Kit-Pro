import stripe from '../Config/stripe.js';
import db from '../Database/db.js';

export const CreateCustomer = async (req, res) => {
  let email = req.body.email;
  let userId = req.body.userId;

  const customer = await stripe.customers.create({
    email,
    metadata: {
      databaseUID: userId
    }
  });

  let text = `UPDATE users SET stripe_customer_id=$1 
              WHERE email=$2
              RETURNING stripe_customer_id`;
  let values = [customer.id, email];

  let callback = (q_err, q_res) => {
    if (q_err) console.log(q_err);
    res.send(q_res.rows[0]);
  };

  //save stripe customer id to database
  db.query(text, values, callback);
};

const GetCustomer = async (req, res) => {
  let customer_id = req.body.customer.stripeCustomerKey;

  let customer = await stripe.customers.retrieve('cus_IaHhrMfzSpEDVS');
};
