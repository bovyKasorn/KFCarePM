import React, { Component } from 'react'
import { TasksJob } from '../containers'

class TasksJobProcess extends Component {
  render() {
    return <TasksJob {...this.props} tasksActive="process" />
  }
}

export { TasksJobProcess }
