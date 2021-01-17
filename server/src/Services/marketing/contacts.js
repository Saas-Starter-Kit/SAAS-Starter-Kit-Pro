import { SibContactsApi } from '../../Config/sendinblue.js';
import { sendEmail } from '../../Config/email.js';

export const CreateContact = async (req, res) => {
  const FIRSTNAME = req.body.firstName;
  const email = req.body.email;

  const listId = parseInt(process.env.SendInBlue_ListId);

  const contact = {
    attributes: {
      FIRSTNAME
    },
    listIds: [listId],
    email
  };

  await SibContactsApi.createContact(contact);

  //send welcome email
  let template = 'welcome';
  let locals = { FIRSTNAME };

  //send verificatoin email
  await sendEmail(email, template, locals);
};

//update email when user updates email
