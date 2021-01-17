import { SibContactsApi } from '../../Config/sendinblue.js';

export const CreateContact = (req, res) => {
  //save sendinblue id to db

  const FIRSTNAME = 'John';
  const email = 'iqbal133fgf5fff@yahoo.com';
  const listId = 5;

  let createContact = {
    attributes: {
      FIRSTNAME
    },
    listIds: [listId],
    email
  };

  SibContactsApi.createContact(createContact).then((res) => console.log(res));

  //save sendinblue id to own db
};

//update email when user updates email
