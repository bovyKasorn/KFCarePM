import React from 'react'
import { Text, TouchableHighlight, Image, View } from 'react-native'
import styled from 'styled-components'
import maintheme from '../theme'
import { normalize } from '../utilities'
import { Row, Space, Segment } from '../components'
import { apiGetProfile } from '../api/getProfile'

const ButtonPrimary = styled(TouchableHighlight)`
  height: 100%;
  align-items: center;
  background-color: ${props => props.theme.color.button.primary.color};
  padding-top: ${normalize(1)};
  padding-bottom: ${normalize(2)};
  padding-left: ${normalize(2)};
  padding-right: ${normalize(2)};
`

const ButtonText = styled(Text)`
  text-align: center;
  color: ${props => props.theme.color.button.text};
  font-size: ${normalize(10)};
  font-weight: 500;
`

const NotiView = styled(View)`
  background-color: ${props =>
    props.count > 0
      ? props.theme.color.noti.bg.primary
      : props.theme.color.noti.bg.secondary};
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
`

const ImageSize = styled(Image)`
  width: ${props => (props.newJob === 1 ? 50 : 45)};
  height: ${props => (props.newJob === 1 ? 50 : 45)};
`

const Button = props => {
  const tasksCount = props.tasksCount || 0

  return (
    <Space flex={1} height={100} mgleft={2} mgright={2}>
      <NotiView count={tasksCount}>
        <Space pdtop={1} pdbottom={1} pdleft={3} pdright={3}>
          <ButtonText>{tasksCount}</ButtonText>
        </Space>
      </NotiView>
      <ButtonPrimary
        {...props}
        underlayColor={maintheme.color.button.primary.active}
      >
        <Space flex={1}>
          <Segment.CenterBottom flex={2}>
            <Space pdleft={props.imgPdLeft} pdbottom={props.imgPdBottom}>
              <ImageSize
                newJob={props.newJob}
                source={props.source}
                resizeMode="contain"
              />
            </Space>
          </Segment.CenterBottom>
          <Segment.CenterMiddle flex={1}>
            <ButtonText {...props}>{props.children}</ButtonText>
          </Segment.CenterMiddle>
        </Space>
      </ButtonPrimary>
    </Space>
  )
}

const TopMenu = props => {
  const {
    navigation,
    newJobCount,
    assignedCount,
    processCount,
    completedCount
  } = props

  return (
    <Space pdleft={4} pdright={4} pdbottom={8}>
      <Row>
        <Button
          flex={1}
          imgPdLeft={6}
          newJob={1}
          source={require('../assets/images/allNewJobIcon.png')}
          tasksCount={newJobCount}
          onPress={() =>
            navigation.state.routeName === 'TasksNewJob'
              ? null
              : navigation.navigate('TasksNewJob')
          }
        >
          NEW JOB
        </Button>

        <Button
          flex={1}
          imgPdLeft={6}
          imgPdBottom={1}
          source={require('../assets/images/allJobAssignedIcon.png')}
          tasksCount={assignedCount}
          onPress={() =>
            navigation.state.routeName === 'TasksJobAssigned'
              ? null
              : navigation.navigate('TasksJobAssigned')
          }
        >
          JOB ASSIGNED
        </Button>

        <Button
          flex={1}
          imgPdBottom={3}
          source={require('../assets/images/allJobProcessIcon.png')}
          tasksCount={processCount}
          onPress={() =>
            navigation.state.routeName === 'TasksJobProcess'
              ? null
              : navigation.navigate('TasksJobProcess')
          }
        >
          JOB PROCESS
        </Button>

        <Button
          flex={1}
          imgPdBottom={3}
          source={require('../assets/images/allJobCompletedIcon.png')}
          tasksCount={completedCount}
          onPress={() =>
            navigation.state.routeName === 'TasksCompleted'
              ? null
              : navigation.navigate('TasksCompleted')
          }
        >
          COMPLETED
        </Button>
      </Row>
    </Space>
  )
}

export { TopMenu }
