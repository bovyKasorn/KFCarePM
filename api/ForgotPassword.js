import { Alert } from 'react-native'
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
    Alert.alert(
      '',
      error.response.data.ModelState
        ? error.response.data.ModelState['Email.Email'][0] || 'Error'
        : error.response.data || 'Error',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    )
    return error.response
  }
}
