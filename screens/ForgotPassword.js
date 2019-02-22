import React from 'react'
import { Image, Keyboard, Alert } from 'react-native'
import styled from 'styled-components'
import { ModalLoading } from '../containers'
import {
  Button,
  Container,
  FontAuth,
  Input,
  Segment,
  Space
} from '../components'
import { normalize } from '../utilities'
import { apiForgotPassword } from '../api/ForgotPassword'

class ForgotPasswordInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      loading: false,
      resApi: null
    }
  }

  handleEmailInput = text => {
    this.setState({ email: text })
  }

  handleLoading = loading => {
    this.setState({ loading })
  }

  render() {
    const { email, loading, resApi } = this.state
    const { navigation } = this.props

    return (
      <Container>
        <Segment.CenterMiddle height="80%">
          <Space>
            <FontAuth.H1>Forgot Your Password?</FontAuth.H1>
          </Space>

          <Space width="80%" pdtop={14}>
            <FontAuth.Content align="center">
              Enter the email address associated with your account and we'll
              email you a link to reset your password.
            </FontAuth.Content>
          </Space>

          <Space width="90%" pdtop={14}>
            <Input
              ref={input => {
                this.emailInput = input
              }}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={this.handleEmailInput}
            />
          </Space>

          <Space pdtop={14}>
            <Button
              onPress={async () => {
                if (email === null || email.trim() === '') {
                  this.emailInput.focus()
                  return
                }

                Keyboard.dismiss()

                this.handleLoading(true)

                const response = await apiForgotPassword(email)

                if (response.data !== '') {
                  this.setState({ resApi: response }, () =>
                    this.handleLoading(false)
                  )
                }

                if (response.data === '') {
                  this.setState({ resApi: null }, () =>
                    this.handleLoading(false)
                  )
                  navigation.navigate('ForgotPasswordSuccess')
                }

                return
              }}
            >
              Reset Password
            </Button>
          </Space>
        </Segment.CenterMiddle>

        <ModalLoading
          loading={loading}
          onDismiss={() =>
            resApi
              ? Alert.alert(
                  '',
                  resApi.data.ModelState
                    ? resApi.data.ModelState['Email.Email'][0] || 'Error'
                    : resApi.data || 'Error',
                  [{ text: 'OK', onPress: () => {} }],
                  { cancelable: false }
                )
              : {}
          }
        />
      </Container>
    )
  }
}

const ImageForgotPasswordSuccess = styled(Image)`
  width: ${normalize(75)};
  height: ${normalize(50)};
`

const ForgotPasswordSuccess = props => {
  const { navigation } = props

  return (
    <Container>
      <Segment.CenterMiddle height="85%">
        <Space pdbottom={8}>
          <ImageForgotPasswordSuccess
            source={require('../assets/images/mailCompleteIcon.png')}
            resizeMode="stretch"
          />
        </Space>

        <Space pdbottom={14}>
          <FontAuth.Label>
            Password reset link has been sent to your email
          </FontAuth.Label>
        </Space>

        <Space>
          <Button onPress={() => navigation.navigate('Login')}>OK</Button>
        </Space>
      </Segment.CenterMiddle>
    </Container>
  )
}

const ForgotPassword = {
  Info: ForgotPasswordInformation,
  Success: ForgotPasswordSuccess
}

export { ForgotPassword }
