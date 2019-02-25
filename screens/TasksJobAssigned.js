import React, { Component } from 'react'
import { TasksJob } from '../containers'

class TasksJobAssigned extends Component {
  render() {
    return <TasksJob {...this.props} tasksActive="assigned" />
  }
}

export { TasksJobAssigned }
