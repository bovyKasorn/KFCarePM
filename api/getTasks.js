import axios from 'axios'
import { AsyncStorage } from 'react-native'
import Environment from '../Environment'

export async function apiGetTasksNewJob() {
  try {
    const AuthToken = `Bearer ${await AsyncStorage.getItem('@token')}`

    let response = await axios.get(
      `${Environment.API_ENDPOINT}/api/tasks/newjob`,
      {
        headers: {
          Authorization: AuthToken
        }
      }
    )
    console.log('apiGetTasksNewJob = ', response);
    return response
  } catch (error) {
    return error.response
  }
}

export async function apiGetTasksJobAssigned() {
  try {
    const AuthToken = `Bearer ${await AsyncStorage.getItem('@token')}`

    let response = await axios.get(
      `${Environment.API_ENDPOINT}/api/tasks/pending`,
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

export async function apiGetTasksJobProcess() {
  try {
    const AuthToken = `Bearer ${await AsyncStorage.getItem('@token')}`

    let response = await axios.get(
      `${Environment.API_ENDPOINT}/api/tasks/process`,
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

export async function apiGetTasksCompleted() {
  try {
    const AuthToken = `Bearer ${await AsyncStorage.getItem('@token')}`

    let response = await axios.get(
      `${Environment.API_ENDPOINT}/api/tasks/completed`,
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

export async function apiGetTasksDetails(taskId) {
  try {
    const AuthToken = `Bearer ${await AsyncStorage.getItem('@token')}`

    let response = await axios.get(
      `${Environment.API_ENDPOINT}/api/tasks/${taskId}/details`,
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
