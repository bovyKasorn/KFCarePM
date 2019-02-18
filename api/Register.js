import { Alert } from 'react-native'
import axios from 'axios'
import Environment from '../Environment'

export async function apiRegister(info) {
  try {
    const {
      fullName,
      email,
      username,
      password,
      empId,
      mobile,
      sectionSelected
    } = info

    const data = {
      PrefixID: 1,
      FullName: fullName,
      Email: email,
      Username: username,
      Password: password,
      StaffID: empId,
      Mobile: mobile,
      SectionID: sectionSelected
    }

    let response = await axios.post(
      `${Environment.API_ENDPOINT}/api/account/register`,
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
        ? error.response.data.ModelState['user.Email'][0] || 'Error'
        : error.response.data || 'Error',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    )
    return error.response
  }
}
