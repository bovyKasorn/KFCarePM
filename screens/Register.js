import React from 'react'
import { Image, Platform, Keyboard, Alert } from 'react-native'
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
import {
  KeyboardAvoidAndScroll,
  SelectSections,
  ModalLoading
} from '../containers'
import { normalize } from '../utilities'
import { apiRegister } from '../api/Register'

class RegisterInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fullName: null,
      nickName: null,
      email: null,
      username: null,
      password: null,
      empId: null,
      mobile: null,
      sectionSelected: null,
      loading: false,
      resApi: null
    }
  }

  handleInput = (text, name) => {
    this.setState({ [name]: text })
  }

  handleSelectSections = section => {
    this.setState({ sectionSelected: section })
  }

  handleLoading = loading => {
    this.setState({ loading })
  }

  render() {
    const {
      fullName,
      nickName,
      email,
      username,
      password,
      empId,
      mobile,
      sectionSelected,
      loading,
      resApi
    } = this.state

    const { navigation } = this.props

    return (
      <KeyboardAvoidAndScroll>
        <Container>
          <Space>
            <Row>
              <Bullet />
              <FontAuth.H2>Register information</FontAuth.H2>
            </Row>
            <Space pdleft={23} pdright={23} pdbottom={8}>
              <Input
                ref={input => {
                  this.fullNameInput = input
                }}
                placeholder="Full Name"
                autoCapitalize="none"
                onChangeText={text => this.handleInput(text, 'fullName')}
                value={fullName}
              />
              <Input
                ref={input => {
                  this.nickNameInput = input
                }}
                placeholder="Nickname"
                autoCapitalize="none"
                onChangeText={text => this.handleInput(text, 'nickName')}
                value={nickName}
              />
              <Input
                ref={input => {
                  this.emailInput = input
                }}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={text => this.handleInput(text, 'email')}
                value={email}
              />
              <Input
                ref={input => {
                  this.usernameInput = input
                }}
                placeholder="Username"
                autoCapitalize="none"
                onChangeText={text => this.handleInput(text, 'username')}
                value={username}
              />
              <Input
                ref={input => {
                  this.passwordInput = input
                }}
                placeholder="Password"
                secureTextEntry
                onChangeText={text => this.handleInput(text, 'password')}
                value={password}
              />
            </Space>
          </Space>

          <Space>
            <Row>
              <Bullet />
              <FontAuth.H2>Personal information</FontAuth.H2>
            </Row>
            <Space pdleft={23} pdright={23} pdbottom={14}>
              <Input
                ref={input => {
                  this.empIdInput = input
                }}
                placeholder="Employer ID"
                autoCapitalize="none"
                onChangeText={text => this.handleInput(text, 'empId')}
                value={empId}
              />
              <Input
                ref={input => {
                  this.mobileInput = input
                }}
                placeholder="Mobile Phone"
                autoCapitalize="none"
                onChangeText={text => this.handleInput(text, 'mobile')}
                value={mobile}
              />
              <SelectSections
                sectionSelected={sectionSelected}
                handleSelectSections={this.handleSelectSections}
              />
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
              <Button
                onPress={async () => {
                  const information = {
                    fullName,
                    nickName,
                    email,
                    username,
                    password,
                    empId,
                    mobile,
                    sectionSelected
                  }

                  const keyInformation = Object.keys(information)

                  const validateInfo = keyInformation.reverse().map(info => {
                    if (info === 'sectionSelected') {
                      return true
                    }

                    if (
                      information[info] === null ||
                      information[info].trim() === ''
                    ) {
                      this[`${info}Input`].focus()
                      return false
                    }

                    return true
                  })

                  if (
                    validateInfo.indexOf(false) !== -1 ||
                    information.sectionSelected === null
                  )
                    return

                  Keyboard.dismiss()

                  this.handleLoading(true)

                  const response = await apiRegister(information)

                  if (response.data !== '') {
                    this.setState({ resApi: response }, () =>
                      this.handleLoading(false)
                    )
                  }

                  if (response.data === '') {
                    this.setState({ resApi: null }, () =>
                      this.handleLoading(false)
                    )
                    navigation.navigate('RegisterSuccess')
                  }

                  return
                }}
              >
                Sign Up
              </Button>
            </Segment.Center>

            <ModalLoading
              loading={loading}
              onDismiss={() =>
                resApi
                  ? Alert.alert(
                      '',
                      resApi.data.ModelState
                        ? resApi.data.ModelState['user.Email'][0] || 'Error'
                        : resApi.data || 'Error',
                      [{ text: 'OK', onPress: () => {} }],
                      { cancelable: false }
                    )
                  : {}
              }
            />
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
  Info: RegisterInformation,
  Success: RegisterSuccess
}

export { Register }
