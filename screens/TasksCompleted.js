import React, { Component } from 'react'
import { TasksJob } from '../containers'

class TasksCompleted extends Component {
  render() {
    const { navigation } = this.props

    return <TasksJob navigation={navigation} tasksActive="completed" />
  }
}

export { TasksCompleted }
