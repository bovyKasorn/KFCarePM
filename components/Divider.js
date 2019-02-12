import { View } from 'react-native'
import styled from 'styled-components'

const Horizontal = styled(View)`
  height: 1;
  border-bottom-width: 0.5;
  border-bottom-color: ${props => props.theme.color.divider};
`

const Vertical = styled(View)`
  height: 100%;
  width: 1;
  border-right-width: 4;
  border-right-color: ${props => props.theme.color.divider};
`

const Divider = {
  Horizontal,
  Vertical
}

export { Divider }
