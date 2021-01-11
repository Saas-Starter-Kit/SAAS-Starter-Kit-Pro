import Email from 'email-templates';
import nodemailer from 'nodemailer';

/* Use this transport to test emails without sending them 
    to real email addresses
*/

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 465,
  secure: false,
  auth: {
    user: process.env.MAIL_TRAP_USERNAME,
    pass: process.env.MAIL_TRAP_PASSWORD
  }
});

export const email = new Email({
  send: true,
  transport: transporter,
  preview: false,
  views: {
    options: {
      extension: 'hbs'
    }
  }
});

export const sendEmail = () => {
  email
    .send({
      template: 'password',
      message: {
        to: 'john@snow.com'
      },
      locals: {
        fname: 'John',
        lname: 'Snow'
      }
    })
    .then(() => console.log('email has been sent!'));
};
