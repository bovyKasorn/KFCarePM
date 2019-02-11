const status = process.env.NODE_ENV
// let dev = {
//   API_ENDPOINT: 'http://app-staging.hrpay.me/api',
//   API_CLOCK_ENDPOINT: 'http://clock-staging.hrpay.me/api'
// }

// let release = {
//   API_ENDPOINT: 'https://app-release.hrpay.me/api',
//   API_CLOCK_ENDPOINT: 'https://clock-release.hrpay.me/api'
// }

let production = {
  API_ENDPOINT: 'https://portal.knightfrank.co.th/preventivemaintenanceapi'
}

let env = production

// switch (status) {
//   case 'development':
//     env = dev
//     break
//   case 'release':
//     env = release
//     break
//   case 'production':
//     env = production
//     break
// }
export default env
