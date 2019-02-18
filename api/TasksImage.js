import axios from 'axios'
import { AsyncStorage } from 'react-native'
import Environment from '../Environment'

export async function apiGetImagesBefore(taskId) {
  try {
    const AuthToken = `Bearer ${await AsyncStorage.getItem('@token')}`

    let response = await axios.get(
      `${Environment.API_ENDPOINT}/api/tasks/${taskId}/images/before`,
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

export async function apiPostImagesBefore(image) {
  try {
    const AuthToken = `Bearer ${await AsyncStorage.getItem('@token')}`

    let response = await axios.post(
      `${Environment.API_ENDPOINT}/api/tasks/images/before`,
      JSON.stringify(image),
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

export async function apiGetImagesAfter(taskId) {
  try {
    const AuthToken = `Bearer ${await AsyncStorage.getItem('@token')}`

    let response = await axios.get(
      `${Environment.API_ENDPOINT}/api/tasks/${taskId}/images/after`,
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

export async function apiPostImagesAfter(image) {
  try {
    const AuthToken = `Bearer ${await AsyncStorage.getItem('@token')}`

    let response = await axios.post(
      `${Environment.API_ENDPOINT}/api/tasks/images/after`,
      JSON.stringify(image),
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
