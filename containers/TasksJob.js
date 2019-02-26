import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import { KeyboardAvoidAndScroll, TasksDetails, TopMenu } from '../containers'
import { Container, Space, Segment, Font } from '../components'
import styled from 'styled-components'
import {
  apiGetTasksNewJob,
  apiGetTasksJobAssigned,
  apiGetTasksJobProcess,
  apiGetTasksCompleted
} from '../api/getTasks'

const TasksLists = props => {
  const { tasksActive, navigation } = props
  const tasksLists = props.tasksLists === '' ? [] : props.tasksLists

  return (
    <Space>
      {tasksLists.length === 0 ? (
        <Container>
          <Segment.CenterMiddle>
            <Font.H2>No Data</Font.H2>
          </Segment.CenterMiddle>
        </Container>
      ) : (
        tasksLists.map((details, index) => {
          return (
            <TasksDetails
              key={index}
              navigation={navigation}
              details={details}
              tasksActive={tasksActive}
            />
          )
        })
      )}
    </Space>
  )
}

const ContainerNonePdBottom = styled(Container)`
  padding-bottom: 0;
`

class TasksJob extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasksNewJobLists: [],
      tasksJobAssignedLists: [],
      tasksJobProcessLists: [],
      tasksCompletedLists: [],
      loading: false
    }
  }

  handleLoading = loading => {
    this.setState({ loading })
  }

  componentDidMount() {
    this.handleLoading(true)

    const api = [
      apiGetTasksNewJob(),
      apiGetTasksJobAssigned(),
      apiGetTasksJobProcess(),
      apiGetTasksCompleted()
    ]

    Promise.all(api).then(response => {
      this.setState({
        tasksNewJobLists: response[0].data,
        tasksJobAssignedLists: response[1].data,
        tasksJobProcessLists: response[2].data,
        tasksCompletedLists: response[3].data
      })

      this.handleLoading(false)
    })
  }

  render() {
    const {
      tasksNewJobLists,
      tasksJobAssignedLists,
      tasksJobProcessLists,
      tasksCompletedLists,
      loading
    } = this.state

    const { navigation, tasksActive } = this.props

    const { profile, leadTech } = this.props.screenProps

    const roleId = profile ? profile.RoleID : null

    let tasks

    switch (tasksActive) {
      case 'new':
        tasks = (
          <TasksLists
            navigation={navigation}
            tasksLists={tasksNewJobLists}
            tasksActive={tasksActive}
          />
        )
        break
      case 'assigned':
        tasks = (
          <TasksLists
            navigation={navigation}
            tasksLists={tasksJobAssignedLists}
            tasksActive={tasksActive}
          />
        )
        break
      case 'process':
        tasks = (
          <TasksLists
            navigation={navigation}
            tasksLists={tasksJobProcessLists}
            tasksActive={roleId === 6 || !leadTech ? tasksActive : 'completed'}
          />
        )
        break
      case 'completed':
        tasks = (
          <TasksLists
            navigation={navigation}
            tasksLists={tasksCompletedLists}
            tasksActive={tasksActive}
          />
        )
        break
      default:
        break
    }

    return (
      <ContainerNonePdBottom noPdSide={1}>
        <TopMenu
          navigation={navigation}
          handleTasksActive={this.handleTasksActive}
          newJobCount={tasksNewJobLists.length}
          assignedCount={tasksJobAssignedLists.length}
          processCount={tasksJobProcessLists.length}
          completedCount={tasksCompletedLists.length}
          roleId={roleId}
          leadTech={leadTech}
        />
        <KeyboardAvoidAndScroll flex={1}>
          <Space>
            {loading ? (
              <Space mgtop={16}>
                <ActivityIndicator />
              </Space>
            ) : (
              tasks
            )}
          </Space>
        </KeyboardAvoidAndScroll>
      </ContainerNonePdBottom>
    )
  }
}

export { TasksJob }
