import axios from 'axios'
import { AsyncStorage } from 'react-native'
import qs from 'qs'

import Environment from '../Environment'

export async function apiSaveTasksDetails(data) {
  try {
    const AuthToken = `Bearer ${await AsyncStorage.getItem('@token')}`

    let response = await axios.get(
      `${Environment.API_ENDPOINT}/api/tasks/save`,
      qs.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: AuthToken
        }
      }
    )

    return response
  } catch (error) {
    return error.response
  }
}
