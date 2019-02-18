import React, { Component } from 'react'
import { StackActions, NavigationActions } from 'react-navigation'
import { Container, Row, Space, Button } from '../components'
import { KeyboardAvoidAndScroll, TasksDetails } from '../containers'
import { apiGetTasksDetails } from '../api/getTasks'
import { apiAcceptJob } from '../api/AcceptJob'

class AcceptTask extends Component {
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

  acceptTask = async () => {
    const { taskDetails } = this.state

    const { navigation } = this.props

    const response = await apiAcceptJob(taskDetails.TaskID)

    if (response.data === '') {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'TasksJobAssigned' })]
      })

      navigation.dispatch(resetAction)
    }
  }

  render() {
    const { taskDetails } = this.state

    const { navigation } = this.props

    return (
      <KeyboardAvoidAndScroll>
        <Container noPdSide={1}>
          <TasksDetails navigation={navigation} details={taskDetails} />
          <Space pdleft={15} pdright={15}>
            <Row>
              <Space flex={1} mgright={8}>
                <Button secondary={1} onPress={() => navigation.goBack()}>
                  Back
                </Button>
              </Space>
              <Space flex={1} mgleft={8}>
                <Button onPress={() => this.acceptTask()}>Accept</Button>
              </Space>
            </Row>
          </Space>
        </Container>
      </KeyboardAvoidAndScroll>
    )
  }
}

export { AcceptTask }
