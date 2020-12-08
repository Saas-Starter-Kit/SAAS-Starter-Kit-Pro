//API requests related to authentication
import axios from "axios"

const axiosBase = process.env.GATSBY_SERVER_URL

//Send Firebase auth token to authenticate against our own server
export const sendtokenToServer = async (token, username) => {
  const data = { token, username }

  const result = await axios.post(`${axiosBase}/auth/sendtoken`, data)

  return result
}

export const updateUserNameApi = async () => {}
