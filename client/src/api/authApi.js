//API requests related to authentication
import axios from 'axios';

//Send Firebase auth token to authenticate against our own server
export const sendtokenToServer = async (token) => {
  const result = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/sendtoken`, {
    token
  });

  return result;
};
