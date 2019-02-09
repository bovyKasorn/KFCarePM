import { Text } from 'react-native'
import styled from 'styled-components'
import { normalize } from '../utilities'

const H2 = styled(Text)`
  font-size: ${normalize(13.5)};
  color: #014040;
`

const FontAuth = {
  H2
}

export { FontAuth }
