import axios from 'axios'
import Environment from '../Environment'

export default async function apiForgotPassword() {
  try {
    // let response = await axios(
    //   'https://portal.knightfrank.co.th/preventivemaintenanceapi/api/account/forgetpassword',
    //   {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     data: JSON.stringify({
    //       Email: 'adasd@asdad.com'
    //     })
    //   }
    // )
    console.log('1')
    const params = {
      Email: 'Test@asda.com'
    }
    let response = await axios.post(
      'https://portal.knightfrank.co.th/preventivemaintenanceapi/api/account/forgetpassword',
      JSON.stringify(params),
      {
        headers: {
          //   Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    console.log('response :', response)
  } catch (error) {
    console.log('error :', error)
    console.log('error')
  }
}
