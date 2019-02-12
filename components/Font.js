import styled from 'styled-components'
import { Text } from 'react-native'
import { normalize } from '../utilities'

const H1 = styled(Text)`
  font-size: ${normalize(16)};
  font-weight: 600;
  color: ${props => props.theme.color.font.secondary};
`

const H2 = styled(Text)`
  font-size: ${normalize(12)};
  font-weight: ${props => (props.bold === 1 ? 600 : 400)};
  color: ${props =>
    props.primary === 1
      ? props.theme.color.font.primary
      : props.theme.color.font.grey};
  line-height: ${normalize(18)};
`

const H3 = styled(Text)`
  font-size: ${normalize(10)};
  font-weight: ${props => (props.bold === 1 ? 600 : 400)};
  color: ${props =>
    props.primary === 1
      ? props.theme.color.font.primary
      : props.theme.color.font.grey};
  font-style: ${props => (props.italic === 1 ? 'italic' : 'normal')};
  line-height: ${normalize(14)};
`

const Font = {
  H1: H1,
  H2: H2,
  H3: H3
}

export { Font }
