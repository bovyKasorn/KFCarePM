import React, { Component } from 'react'
import { AppState } from 'react-native'

class AppStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appState: AppState.currentState
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
    }
    console.log('AppStatus', nextAppState)
    this.setState({ appState: nextAppState })
  }

  render() {
    const { appState } = this.state

    return this.props.children(appState)
  }
}

export { AppStatus }
