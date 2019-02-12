import { Text } from 'react-native'
import styled from 'styled-components'
import { normalize } from '../utilities'

const H1 = styled(Text)`
  font-size: ${normalize(20)};
  color: ${props => props.theme.color.font_auth.H1};
`

const H2 = styled(Text)`
  font-size: ${normalize(13.5)};
  color: ${props => props.theme.color.font_auth.H2};
`
const Content = styled(Text)`
  font-size: ${normalize(10.5)};
  color: ${props => props.theme.color.font_auth.content};
  text-align: ${props => (props.align ? props.align : 'left')};
`

const Label = styled(Text)`
  font-size: ${normalize(12)};
  color: ${props => props.theme.color.font_auth.label};
`

const FontAuth = {
  H1,
  H2,
  Content,
  Label
}

export { FontAuth }
