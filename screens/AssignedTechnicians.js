import React, { Component } from 'react'
import { Container } from '../components'
import { KeyboardAvoidAndScroll, TasksDetails } from '../containers'
import { apiGetTasksDetails } from '../api/getTasks'

class AssignedTechnicians extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskDetails: {}
    }
  }

  componentDidMount() {
    const { navigation } = this.props

    const TaskId = navigation.getParam('TaskId')

    apiGetTasksDetails(TaskId).then(response => {
      this.setState({ taskDetails: response.data })
    })
  }

  render() {
    const { taskDetails } = this.state

    const { navigation } = this.props

    return (
      <KeyboardAvoidAndScroll>
        <Container noPdSide={1}>
          <TasksDetails
            navigation={navigation}
            assigned
            details={taskDetails}
          />
        </Container>
      </KeyboardAvoidAndScroll>
    )
  }
}

export { AssignedTechnicians }
