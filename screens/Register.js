import React from 'react'
import { View, Image } from 'react-native'
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
          <View>
            <Row>
              <Bullet source={require('../assets/images/bulletHeadXL.png')} />
              <FontAuth.H2>Register Infomation</FontAuth.H2>
            </Row>
            <Space
              pdleft={normalize(23)}
              pdright={normalize(23)}
              pdbottom={normalize(8)}
            >
              <Input placeholder="Full Name" />
              <Input placeholder="Nickname" />
              <Input placeholder="Email" autoCapitalize="none" />
              <Input placeholder="Password" secureTextEntry />
            </Space>
          </View>

          <View>
            <Row>
              <Bullet source={require('../assets/images/bulletHeadXL.png')} />
              <FontAuth.H2>Personal Infomation</FontAuth.H2>
            </Row>
            <Space
              pdleft={normalize(23)}
              pdright={normalize(23)}
              pdbottom={normalize(14)}
            >
              <Input placeholder="Employer ID" />
              <Input placeholder="Mobile Phone" />
              <Input placeholder="Section" />
            </Space>
          </View>

          <Divider />

          <Space
            pdleft={normalize(20)}
            pdright={normalize(20)}
            pdtop={normalize(14)}
          >
            <FontAuth.Content>
              Your personal information will be kept confidential and used only
              to provide your benefit coverage and recover your password.
            </FontAuth.Content>
          </Space>

          <Space pdtop={normalize(20)}>
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

const RegisterSuccess = props => {
  const { navigation } = props

  return (
    <Container>
      <Segment.CenterMiddle height="85%">
        <Space pdbottom={normalize(8)}>
          <Image
            style={{ width: normalize(55), height: normalize(73) }}
            source={require('../assets/images/accountCompleteIcon.png')}
            resizeMode="stretch"
          />
        </Space>

        <Space pdbottom={normalize(14)}>
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
