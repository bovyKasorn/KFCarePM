import { View } from 'react-native'
import styled from 'styled-components'

const SegmentCenter = styled(View)`
  align-items: center;
`

const SegmentCenterMiddle = styled(SegmentCenter)`
  justify-content: center;
`

const SegmentCenterBottom = styled(SegmentCenter)`
  justify-content: flex-end;
`

const Segment = {
  Center: SegmentCenter,
  CenterMiddle: SegmentCenterMiddle,
  CenterBottom: SegmentCenterBottom
}

export { Segment }
