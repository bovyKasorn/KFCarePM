import React, { Component } from 'react'
import ImagePicker from 'react-native-image-picker'
import { KeyboardAvoidAndScroll, TasksDetail, TopMenu } from '../containers'
import { Container, Space } from '../components'
import {
  apiGetTasksNewJob,
  apiGetTasksJobAssigned,
  apiGetTasksJobProcess,
  apiGetTasksCompleted
} from '../api/getTasks'

const TasksLists = props => {
  const tasksLists = props.tasksLists === '' ? [] : props.tasksLists

  return (
    <Space>
      {tasksLists.map((detail, index) => {
        return <TasksDetail key={index} detail={detail} />
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

  // test = () => {
  //   const options = {
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images'
  //     }
  //   }

  //   ImagePicker.showImagePicker(options, response => {
  //     console.log('Response = ', response)

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker')
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error)
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton)
  //     } else {
  //       const source = { uri: response.uri }

  //       // You can also display the image using data:
  //       // const source = { uri: 'data:image/jpeg;base64,' + response.data };

  //       this.setState({
  //         avatarSource: source
  //       })
  //     }
  //   })
  // }

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
        tasks = <TasksLists tasksLists={tasksNewJobLists} />
        break
      case 'assigned':
        tasks = <TasksLists tasksLists={tasksJobAssignedLists} />
        break
      case 'process':
        tasks = <TasksLists tasksLists={tasksJobProcessLists} />
        break
      case 'completed':
        tasks = <TasksLists tasksLists={tasksCompletedLists} />
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
