import { TextInput } from 'react-native'
import styled from 'styled-components'
import { normalize } from '../utilities'

const input_login = {
  width: '90%',
  border: {
    width: 1,
    radius: 3
  },
  padding: normalize(16),
  font: {
    size: normalize(14)
  }
}

const LoginEmail = styled(TextInput)`
  width: ${input_login.width};
  border-width: ${input_login.border.width};
  border-color: ${props => props.theme.color.input_login.border};
  border-top-right-radius: ${input_login.border.radius};
  border-top-left-radius: ${input_login.border.radius};
  padding-top: ${input_login.padding};
  padding-bottom: ${input_login.padding};
  padding-left: ${input_login.padding};
  padding-right: ${input_login.padding};
  font-size: ${input_login.font.size};
  color: ${props => props.theme.color.input_login.font};
`

const LoginPassword = styled(TextInput)`
  width: ${input_login.width};
  border-width: ${input_login.border.width};
  border-top-width: 0;
  border-color: ${props => props.theme.color.input_login.border};
  border-bottom-right-radius: ${input_login.border.radius};
  border-bottom-left-radius: ${input_login.border.radius};
  padding-top: ${input_login.padding};
  padding-bottom: ${input_login.padding};
  padding-left: ${input_login.padding};
  padding-right: ${input_login.padding};
  font-size: ${input_login.font.size};
  color: ${props => props.theme.color.input_login.font};
`

const InputLogin = {
  Email: LoginEmail,
  Password: LoginPassword
}

export { InputLogin }
