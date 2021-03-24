import { SibContactsApi } from '../../Config/sendinblue.js';

// Save signed up user's email to sendinblue
// called in verifyUser in Services/auth/authentication.js CreateUser()
export const CreateContact = async (email, FIRSTNAME) => {
  const listId = parseInt(process.env.SendInBlue_ListId);

  const contact = {
    attributes: {
      FIRSTNAME
    },
    listIds: [listId],
    email
  };

  await SibContactsApi.createContact(contact).catch((err) => console.log(err));
};

//update sib email when user updates account email
//called in Services/auth/authentication.js updateEmail()
export const UpdateContact = async (email, oldEmail) => {
  const updateContact = {
    attributes: {
      Email: email
    }
  };

  await SibContactsApi.updateContact(oldEmail, updateContact).catch((err) => console.log(err));
  return;
};
