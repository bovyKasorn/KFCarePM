import axios from 'axios'
import Environment from '../Environment'

export default async function apiForgotPassword() {
  try {
    const data = {
      Email: 'indy.bovy@gmail.com'
    }
    let response = await axios.post(
      'https://portal.knightfrank.co.th/preventivemaintenanceapi/api/account/forgetpassword',
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
    return
  }
}
