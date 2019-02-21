import React from 'react'
import { Modal, ActivityIndicator } from 'react-native'
import styled from 'styled-components'
import { Segment } from '../components'

const SegmentModalLoading = styled(Segment.CenterMiddle)`
  background-color: rgba(0, 0, 0, 0.8);
`

const ModalLoading = props => {
  return (
    <Modal
      {...props}
      animationType="none"
      transparent={true}
      visible={props.loading}
    >
      <SegmentModalLoading flex={1}>
        <ActivityIndicator size="large" />
      </SegmentModalLoading>
    </Modal>
  )
}

export { ModalLoading }
