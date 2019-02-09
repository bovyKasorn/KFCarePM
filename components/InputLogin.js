import React from 'react'
import { TextInput } from 'react-native'
import styled from 'styled-components'
import { normalize } from '../utilities'

const theme = {
  input_login: {
    width: '90%',
    border: {
      width: 1,
      radius: 3,
      color: '#dfdfdf'
    },
    padding: normalize(16),
    font: {
      size: normalize(14),
      color: '#014040',
      placeholder: 'rgba(1,64,64,0.5)'
    }
  }
}

const LoginEmail = styled(TextInput)`
  width: ${theme.input_login.width};
  border-width: ${theme.input_login.border.width};
  border-color: ${theme.input_login.border.color};
  border-top-right-radius: ${theme.input_login.border.radius};
  border-top-left-radius: ${theme.input_login.border.radius};
  padding-top: ${theme.input_login.padding};
  padding-bottom: ${theme.input_login.padding};
  padding-left: ${theme.input_login.padding};
  padding-right: ${theme.input_login.padding};
  font-size: ${theme.input_login.font.size};
  color: ${theme.input_login.font.color};
`

const LoginPassword = styled(TextInput)`
  width: ${theme.input_login.width};
  border-width: ${theme.input_login.border.width};
  border-top-width: 0;
  border-color: ${theme.input_login.border.color};
  border-bottom-right-radius: ${theme.input_login.border.radius};
  border-bottom-left-radius: ${theme.input_login.border.radius};
  padding-top: ${theme.input_login.padding};
  padding-bottom: ${theme.input_login.padding};
  padding-left: ${theme.input_login.padding};
  padding-right: ${theme.input_login.padding};
  font-size: ${theme.input_login.font.size};
  color: ${theme.input_login.font.color};
`

const InputLogin = props => {
  return props.password ? (
    <LoginPassword
      {...props}
      secureTextEntry
      placeholderTextColor={theme.input_login.font.placeholder}
    />
  ) : (
    <LoginEmail
      {...props}
      autoCapitalize="none"
      placeholderTextColor={theme.input_login.font.placeholder}
    />
  )
}

export { InputLogin }
