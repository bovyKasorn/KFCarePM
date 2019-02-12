import { View } from 'react-native'
import styled from 'styled-components'
import { normalize } from '../utilities'

const Container = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  flex-direction: column;
  padding-top: ${normalize(15)};
  padding-bottom: ${normalize(15)};
  padding-left: ${props =>
    props.noPdSide === 1 ? normalize(0) : normalize(15)};
  padding-right: ${props =>
    props.noPdSide === 1 ? normalize(0) : normalize(15)};
`
export { Container }
