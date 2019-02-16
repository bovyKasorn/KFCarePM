import React, { Component } from 'react'
import { TasksJob } from '../containers'

class TasksNewJob extends Component {
  render() {
    const { navigation } = this.props

    return <TasksJob navigation={navigation} tasksActive="new" />
  }
}

export { TasksNewJob }
