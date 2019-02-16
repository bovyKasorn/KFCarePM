import React, { Component } from 'react'
import { TasksJob } from '../containers'

class TasksJobAssigned extends Component {
  render() {
    const { navigation } = this.props

    return <TasksJob navigation={navigation} tasksActive="assigned" />
  }
}

export { TasksJobAssigned }
