import Email from 'email-templates';
import nodemailer from 'nodemailer';

/* 
  Use mailtrap for testing and switch to 
  sendinblue when going live.
*/

let host;
let port;
let user;
let pass;

if (process.env.NODE_ENV !== 'production') {
  host = 'live.smtp.mailtrap.io';
  port = 587;
  user = process.env.MAIL_TRAP_USERNAME;
  pass = process.env.MAIL_TRAP_PASSWORD;
} else {
  // host = 'live.smtp.mailtrap.io';
  // port = 587;
  // user = process.env.MAIL_TRAP_USERNAME;
  // pass = process.env.MAIL_TRAP_PASSWORD;
  // TODO: Change this to sendinblue in later stage
  host = 'smtp-relay.sendinblue.com';
  port = 587;
  user = process.env.SendInBlue_User;
  pass = process.env.SendInBlue_Password;
}

let transport = nodemailer.createTransport({
  host,
  //host: 'localhost', //will cause error but show email preview
  port,
  auth: {
    user,
    pass
  }
});

export const email = new Email({
  message: {
    from: user
  },
  send: true,
  transport,
  preview: true, // to preview emails in your own browser
  views: {
    options: {
      extension: 'hbs'
    }
  }
});

let product_name = process.env.PRODUCT_NAME;
let product_url = process.env.PRODUCT_URL;
let company_name = process.env.COMPANY_NAME;
let company_address = process.env.COMPANY_ADDRESS;

export const sendEmail = async (toEmail, template, locals) => {
  await email.send({
    template,
    message: {
      to: toEmail
    },
    locals: { ...locals, product_name, product_url, company_address, company_name }
  });
};
