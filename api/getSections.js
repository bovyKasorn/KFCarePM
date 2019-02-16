import axios from 'axios'
import Environment from '../Environment'

export default async function apiGetSections() {
  try {
    let response = await axios.get(`${Environment.API_ENDPOINT}/api/sections`)

    return response
  } catch (error) {
    return error.response
  }
}
