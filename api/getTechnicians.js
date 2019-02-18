import axios from 'axios'
import { AsyncStorage } from 'react-native'
import Environment from '../Environment'

export async function apiGetTechnicians() {
  try {
    const AuthToken = `Bearer ${await AsyncStorage.getItem('@token')}`

    let response = await axios.get(
      `${Environment.API_ENDPOINT}/api/Technicians`,
      {
        headers: {
          Authorization: AuthToken
        }
      }
    )

    return response
  } catch (error) {
    return error.response
  }
}
