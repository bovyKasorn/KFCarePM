import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components'
import {
  Button,
  Container,
  FontAuth,
  Input,
  Segment,
  Space
} from '../components'
import { normalize } from '../utilities'
import apiForgotPassword from '../api/ForgotPassword'

class ForgotPasswordInfomation extends React.Component {
  render() {
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
            <Input placeholder="Email" autoCapitalize="none" />
          </Space>

          <Space pdtop={14}>
            <Button
              onPress={async () => {
                const response = await apiForgotPassword()

                if (response.data === '') {
                  navigation.navigate('ForgotPasswordSuccess')
                }

                return
              }}
            >
              Reset Password
            </Button>
          </Space>
        </Segment.CenterMiddle>
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
  Info: ForgotPasswordInfomation,
  Success: ForgotPasswordSuccess
}

export { ForgotPassword }
