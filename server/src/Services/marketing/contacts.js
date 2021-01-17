import { SibContactsApi } from '../../Config/sendinblue.js';

export const CreateContact = (req, res) => {
  const FIRSTNAME = 'John';
  const email = 'iqbal133fgf5fff@yahoo.com';

  const FIRSTNAME = req.body.firstName;
  const email = req.body.email;

  const listId = process.env.SendInBlue_ListId;

  let createContact = {
    attributes: {
      FIRSTNAME
    },
    listIds: [listId],
    email
  };

  SibContactsApi.createContact(createContact).then((res) => console.log(res));
};

//update email when user updates email
