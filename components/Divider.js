import { View } from 'react-native'
import styled from 'styled-components'

const Divider = styled(View)`
  height: 1;
  border-bottom-width: 0.5;
  border-bottom-color: ${props => props.theme.color.divider};
`

export { Divider }
