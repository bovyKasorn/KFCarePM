import { View } from 'react-native'
import styled from 'styled-components'
import { normalize } from '../utilities'

const Row = styled(View)`
  flex-direction: row;
  padding-top: ${normalize(3)};
  padding-bottom: ${normalize(3)};
`

export { Row }
