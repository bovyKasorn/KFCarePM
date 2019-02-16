import React, { Component } from 'react'
import { TasksJob } from '../containers'

class TasksJobProcess extends Component {
  render() {
    const { navigation } = this.props

    return <TasksJob navigation={navigation} tasksActive="process" />
  }
}

export { TasksJobProcess }
