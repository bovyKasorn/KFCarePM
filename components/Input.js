import { TextInput } from 'react-native'
import styled from 'styled-components'
import { normalize } from '../utilities'

const Input = styled(TextInput)`
  border-width: 1;
  border-color: ${props => props.theme.color.input.border};
  border-radius: 4;
  padding-top: ${normalize(8)};
  padding-bottom: ${normalize(8)};
  padding-left: ${normalize(13)};
  padding-right: ${normalize(13)};
  margin-top: ${normalize(4)};
  margin-bottom: ${normalize(4)};
`

export { Input }
