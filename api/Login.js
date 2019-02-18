import { Alert, AsyncStorage } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import axios from 'axios'
import qs from 'qs'
import Environment from '../Environment'

export async function apiLogin(info) {
  try {
    const { username, password } = info

    const uniqueId = DeviceInfo.getUniqueID()

    const data = {
      username,
      password,
      grant_type: 'password',
      device_token: uniqueId
    }

    let response = await axios.post(
      `${Environment.API_ENDPOINT}/token`,
      qs.stringify(data),
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    const { access_token } = response.data

    await AsyncStorage.setItem('@token', access_token)

    return response
  } catch (error) {
    Alert.alert(
      '',
      error.response.data.error_description || 'Error',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    )
    return error.response
  }
}
