import { sendEmail } from '../../Config/email.js';

/*
    The actual payment is processed directly by
    stripe from the client. We only need to send 
    a confirmation email from the server
*/

export const OneTimePayConfirm = async (req, res) => {
  let email = req.body.receipt_email;
  let amount = req.body.amount * 0.01;

  let template = 'order confirm';
  let locals = { amount };

  //send verification email
  await sendEmail(email, template, locals);
  res.send('Order Confirm Email Sent');
};
