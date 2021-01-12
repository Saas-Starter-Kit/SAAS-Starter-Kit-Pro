import Email from 'email-templates';
import nodemailer from 'nodemailer';

/* 
   Use this transport to test emails without sending them 
   to real email addresses
*/

const transporter = nodemailer.createTransport({
  //host: 'smtp.mailtrap.io',
  host: 'localhost',
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
  preview: true, // to preview emails in your own browser
  views: {
    options: {
      extension: 'hbs'
    }
  }
});

export const sendEmail = () => {
  email
    .send({
      template: 'order confirm',
      message: {
        to: 'john@snow.com'
      },
      locals: {
        name: 'John Snow'
      }
    })
    .then(() => console.log('email has been sent!'));
};
