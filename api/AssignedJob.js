import axios from 'axios'
import { AsyncStorage } from 'react-native'
import Environment from '../Environment'

export async function apiAssignedJob(taskId, tech) {
  try {
    const AuthToken = `Bearer ${await AsyncStorage.getItem('@token')}`

    const data = {
      TaskID: taskId,
      Technicians: tech
    }

    let response = await axios.post(
      `${Environment.API_ENDPOINT}/api/tasks/assign`,
      JSON.stringify(data),
      {
        headers: {
          Accept: 'application/json',
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
