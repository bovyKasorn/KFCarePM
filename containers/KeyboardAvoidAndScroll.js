import React, { Component } from 'react'
import { Header } from 'react-navigation'
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  Dimensions
} from 'react-native'

const { height } = Dimensions.get('window')

class KeyboardAvoidAndScroll extends Component {
  constructor(props) {
    super(props)
    this.state = { keyboardOpen: false, screenHeight: 0 }
  }

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      e => this._keyboardWillShow(e)
    )
    this.keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      e => this._keyboardWillHide(e)
    )
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove()
    this.keyboardWillHideListener.remove()
  }

  _keyboardWillShow = e => {
    this.setState({
      keyboardOpen: true
    })
  }

  _keyboardWillHide = e => {
    this.setState({
      keyboardOpen: false
    })
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight })
  }

  render() {
    const { keyboardOpen, screenHeight } = this.state
    const scrollEnabled = screenHeight > height || keyboardOpen

    return (
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'android' ? null : 'padding'}
        keyboardVerticalOffset={Header.HEIGHT}
        enabled
      >
        <ScrollView
          flex={1}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
        >
          {this.props.children}
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export { KeyboardAvoidAndScroll }
