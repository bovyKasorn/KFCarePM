import React, { Component } from 'react'
import { TasksJob } from '../containers'

class TasksCompleted extends Component {
  render() {
    return <TasksJob {...this.props} tasksActive="completed" />
  }
}

export { TasksCompleted }
