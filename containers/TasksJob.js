import React, { Component } from 'react'
import { KeyboardAvoidAndScroll, TasksDetails, TopMenu } from '../containers'
import { Container, Space } from '../components'
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

class TasksJob extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasksNewJobLists: [],
      tasksJobAssignedLists: [],
      tasksJobProcessLists: [],
      tasksCompletedLists: []
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
  }

  render() {
    const {
      tasksNewJobLists,
      tasksJobAssignedLists,
      tasksJobProcessLists,
      tasksCompletedLists
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
      <KeyboardAvoidAndScroll>
        <Container noPdSide={1}>
          <TopMenu
            navigation={navigation}
            handleTasksActive={this.handleTasksActive}
            newJobCount={tasksNewJobLists.length}
            assignedCount={tasksJobAssignedLists.length}
            processCount={tasksJobProcessLists.length}
            completedCount={tasksCompletedLists.length}
          />
          {tasks}
        </Container>
      </KeyboardAvoidAndScroll>
    )
  }
}

export { TasksJob }
