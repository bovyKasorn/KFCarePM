import { View } from 'react-native'
import styled from 'styled-components'

const SegmentCenter = styled(View)`
  flex: 1;
  align-items: center;
`

const SegmentCenterBottom = styled(SegmentCenter)`
  justify-content: flex-end;
`

const Segment = {
  Center: SegmentCenter,
  CenterBottom: SegmentCenterBottom
}

export { Segment }
