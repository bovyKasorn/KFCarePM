import React from 'react'
import { Image } from 'react-native'
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

          <Space width="80%" pdtop={normalize(14)}>
            <FontAuth.Content style={{ textAlign: 'center' }}>
              Enter the email address associated with your account and we'll
              email you a link to reset your password.
            </FontAuth.Content>
          </Space>

          <Space width="90%" pdtop={normalize(14)}>
            <Input placeholder="Email" autoCapitalize="none" />
          </Space>

          <Space pdtop={normalize(14)}>
            <Button
              onPress={
                () => navigation.navigate('ForgotPasswordSuccess')
                // apiForgotPassword()
              }
            >
              Reset Password
            </Button>
          </Space>
        </Segment.CenterMiddle>
      </Container>
    )
  }
}

const ForgotPasswordSuccess = props => {
  const { navigation } = props

  return (
    <Container>
      <Segment.CenterMiddle height="85%">
        <Space pdbottom={normalize(8)}>
          <Image
            style={{ width: normalize(75), height: normalize(50) }}
            source={require('../assets/images/mailCompleteIcon.png')}
            resizeMode="stretch"
          />
        </Space>

        <Space pdbottom={normalize(14)}>
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
