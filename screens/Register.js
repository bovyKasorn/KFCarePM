import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components'
import {
  Bullet,
  Button,
  Container,
  Divider,
  FontAuth,
  Input,
  Row,
  Segment,
  Space
} from '../components'
import { KeyboardAvoidAndScroll } from '../containers'
import { normalize } from '../utilities'

class RegisterInfomation extends React.Component {
  render() {
    const { navigation } = this.props

    return (
      <KeyboardAvoidAndScroll>
        <Container>
          <Space>
            <Row>
              <Bullet />
              <FontAuth.H2>Register Infomation</FontAuth.H2>
            </Row>
            <Space pdleft={23} pdright={23} pdbottom={8}>
              <Input placeholder="Full Name" />
              <Input placeholder="Nickname" />
              <Input placeholder="Email" autoCapitalize="none" />
              <Input placeholder="Password" secureTextEntry />
            </Space>
          </Space>

          <Space>
            <Row>
              <Bullet />
              <FontAuth.H2>Personal Infomation</FontAuth.H2>
            </Row>
            <Space pdleft={23} pdright={23} pdbottom={14}>
              <Input placeholder="Employer ID" />
              <Input placeholder="Mobile Phone" />
              <Input placeholder="Section" />
            </Space>
          </Space>

          <Divider.Horizontal />

          <Space pdleft={20} pdright={20} pdtop={14}>
            <FontAuth.Content>
              Your personal information will be kept confidential and used only
              to provide your benefit coverage and recover your password.
            </FontAuth.Content>
          </Space>

          <Space pdtop={20}>
            <Segment.Center flex={1}>
              <Button onPress={() => navigation.navigate('RegisterSuccess')}>
                Sign Up
              </Button>
            </Segment.Center>
          </Space>
        </Container>
      </KeyboardAvoidAndScroll>
    )
  }
}

const ImageRegisterSuccess = styled(Image)`
  width: ${normalize(55)};
  height: ${normalize(73)};
`

const RegisterSuccess = props => {
  const { navigation } = props

  return (
    <Container>
      <Segment.CenterMiddle height="85%">
        <Space pdbottom={8}>
          <ImageRegisterSuccess
            source={require('../assets/images/accountCompleteIcon.png')}
            resizeMode="stretch"
          />
        </Space>

        <Space pdbottom={14}>
          <FontAuth.Label>Account has been successfully created</FontAuth.Label>
        </Space>

        <Space>
          <Button onPress={() => navigation.navigate('Login')}>OK</Button>
        </Space>
      </Segment.CenterMiddle>
    </Container>
  )
}

const Register = {
  Info: RegisterInfomation,
  Success: RegisterSuccess
}

export { Register }
