import { View } from 'react-native'
import styled from 'styled-components'

const Space = styled(View)`
  padding-top: ${props => (props.pdtop ? props.pdtop : 0)};
  padding-bottom: ${props => (props.pdbottom ? props.pdbottom : 0)};
  padding-left: ${props => (props.pdleft ? props.pdleft : 0)};
  padding-right: ${props => (props.pdright ? props.pdright : 0)};
  margin-top: ${props => (props.mgtop ? props.mgtop : 0)};
  margin-bottom: ${props => (props.mgbottom ? props.mgbottom : 0)};
  margin-left: ${props => (props.mgleft ? props.mgleft : 0)};
  margin-right: ${props => (props.mgright ? props.mgright : 0)};
`

export { Space }
