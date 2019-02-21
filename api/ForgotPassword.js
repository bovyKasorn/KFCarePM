import axios from 'axios'
import Environment from '../Environment'

export async function apiForgotPassword(email) {
  try {
    const data = {
      Email: email
    }

    let response = await axios.post(
      `${Environment.API_ENDPOINT}/api/account/forgetpassword`,
      JSON.stringify(data),
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )

    return response
  } catch (error) {
    return error.response
  }
}
