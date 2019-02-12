import { View } from 'react-native'
import styled from 'styled-components'
import { normalize } from '../utilities'

const Space = styled(View)`
  padding-top: ${props => (props.pdtop ? normalize(props.pdtop) : 0)};
  padding-bottom: ${props => (props.pdbottom ? normalize(props.pdbottom) : 0)};
  padding-left: ${props => (props.pdleft ? normalize(props.pdleft) : 0)};
  padding-right: ${props => (props.pdright ? normalize(props.pdright) : 0)};
  margin-top: ${props => (props.mgtop ? normalize(props.mgtop) : 0)};
  margin-bottom: ${props => (props.mgbottom ? normalize(props.mgbottom) : 0)};
  margin-left: ${props => (props.mgleft ? normalize(props.mgleft) : 0)};
  margin-right: ${props => (props.mgright ? normalize(props.mgright) : 0)};
`

export { Space }
