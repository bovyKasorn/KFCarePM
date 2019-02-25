import React, { Component } from 'react'
import { TasksJob } from '../containers'

class TasksNewJob extends Component {
  render() {
    return <TasksJob {...this.props} tasksActive="new" />
  }
}

export { TasksNewJob }
