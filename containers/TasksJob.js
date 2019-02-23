import React, { Component } from 'react'
import { KeyboardAvoidAndScroll, TasksDetails, TopMenu } from '../containers'
import { Container, Space } from '../components'
import styled from 'styled-components'
import {
  apiGetTasksNewJob,
  apiGetTasksJobAssigned,
  apiGetTasksJobProcess,
  apiGetTasksCompleted
} from '../api/getTasks'
import { apiGetProfile } from '../api/getProfile'

const TasksLists = props => {
  const { tasksActive, navigation } = props
  const tasksLists = props.tasksLists === '' ? [] : props.tasksLists

  return (
    <Space>
      {tasksLists.map((details, index) => {
        return (
          <TasksDetails
            key={index}
            navigation={navigation}
            details={details}
            tasksActive={tasksActive}
          />
        )
      })}
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
      roleId: null
    }
  }

  componentDidMount() {
    apiGetTasksNewJob().then(response => {
      this.setState({ tasksNewJobLists: response.data })
    })

    apiGetTasksJobAssigned().then(response => {
      this.setState({ tasksJobAssignedLists: response.data })
    })

    apiGetTasksJobProcess().then(response => {
      this.setState({ tasksJobProcessLists: response.data })
    })

    apiGetTasksCompleted().then(response => {
      this.setState({ tasksCompletedLists: response.data })
    })

    apiGetProfile().then(response => {
      this.setState({ roleId: response.data.RoleID })
    })
  }

  render() {
    const {
      tasksNewJobLists,
      tasksJobAssignedLists,
      tasksJobProcessLists,
      tasksCompletedLists,
      roleId
    } = this.state

    const { navigation, tasksActive } = this.props

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
            tasksActive={tasksActive}
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
        />
        <KeyboardAvoidAndScroll flex={1}>
          <Space>{tasks}</Space>
        </KeyboardAvoidAndScroll>
      </ContainerNonePdBottom>
    )
  }
}

export { TasksJob }
