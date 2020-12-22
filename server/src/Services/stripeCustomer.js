import stripe from '../Config/stripe.js';
import db from '../Database/db.js';

export const CreateCustomer = async (req, res) => {
  let email = req.body.email;
  let userId = req.body.userId;

  const customer = await stripe.customers
    .create({
      email,
      metadata: {
        databaseUID: userId
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Stripe Sign Up Failed');
      throw new Error('Stripe SignUp Failed');
    });

  let text = `UPDATE users SET stripe_customer_id=$1 
              WHERE email=$2
              RETURNING stripe_customer_id`;
  let values = [customer.id, email];

  //save stripe customer id to database
  let queryResult = await db.query(text, values).catch((err) => {
    console.log(err);
    res.status(500).send('User Sign Up Failed');
    throw new Error('Database Insert Query Failed');
  });

  if (queryResult.rows === 0) {
    res.status(500).send('User Sign Up Failed');
    throw new Error('Database Insert Query Failed');
  }

  res.send(queryResult.rows[0]);
};

//const GetCustomer = async (req, res) => {
//  let customer_id = req.body.customer.stripeCustomerKey;

//  let customer = await stripe.customers.retrieve(customer_id).catch((err) => {
//    console.log(err);
//    res.status(500).send('Stripe Sign Up Failed');
//    throw new Error('Stripe SignUp Failed');
//  });
//};
