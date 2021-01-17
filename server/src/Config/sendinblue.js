import SibApiV3Sdk from 'sib-api-v3-sdk';

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];

apiKey.apiKey = process.env.SendInBlue_API_KEY;

export const SibContactsApi = new SibApiV3Sdk.ContactsApi();

export const SibListsApi = new SibApiV3Sdk.ListsApi();
