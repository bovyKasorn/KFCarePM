import React, { Component } from 'react'
import { Header } from 'react-navigation'
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard
} from 'react-native'

class KeyboardAvoidAndScroll extends Component {
  constructor(props) {
    super(props)
    this.state = { keyboardOpen: false }
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
    // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e =>
    //   this._keyboardDidShow(e)
    // )
    // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', e =>
    //   this._keyboardDidHide(e)
    // )
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove()
    this.keyboardWillHideListener.remove()
    // this.keyboardDidShowListener.remove()
    // this.keyboardDidHideListener.remove()
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

  // _keyboardDidShow = e => {
  //   this.setState({
  //     keyboardOpen: true
  //   })
  // }

  // _keyboardDidHide = e => {
  //   this.setState({
  //     keyboardOpen: false
  //   })
  // }

  render() {
    const { keyboardOpen } = this.state
    return (
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'android' ? null : 'padding'}
        keyboardVerticalOffset={Header.HEIGHT}
        enabled
      >
        <ScrollView
          flex={1}
          scrollEnabled={Platform.OS === 'android' ? true : keyboardOpen}
        >
          {this.props.children}
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export { KeyboardAvoidAndScroll }
