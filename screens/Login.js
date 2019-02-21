import React from 'react'
import { Text, Image, TouchableHighlight, Keyboard, Alert } from 'react-native'
import styled from 'styled-components'
import { ModalLoading } from '../containers'
import { Button, InputLogin, Container, Segment, Space } from '../components'
import maintheme from '../theme'
import { apiLogin } from '../api/Login'

const LoginBackground = styled(Image)`
  position: absolute;
  bottom: 0;
  left: -10;
  right: 0;
  flex: 1;
  height: 52%;
  width: 280%;
`

const LogoImage = styled(Image)`
  width: 78%;
  height: 100%;
`

const TextLinkText = styled(Text)`
  color: ${props => props.theme.color.textlink};
  text-decoration-line: underline;
  text-align: center;
`

const TextLink = props => {
  const { navigation } = props
  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => navigation.navigate('ForgotPasswordInfo')}
    >
      <TextLinkText>{props.children}</TextLinkText>
    </TouchableHighlight>
  )
}

class Login extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      header: null
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password: null,
      loading: false,
      resApi: null
    }
  }

  handleInput = (text, name) => {
    this.setState({ [name]: text })
  }

  handleLoading = loading => {
    this.setState({ loading })
  }

  render() {
    const { username, password, loading, resApi } = this.state
    const { navigation } = this.props

    return (
      <Container>
        <LoginBackground source={require('../assets/images/bgLogin.png')} />

        <Segment.Center flex={1.6}>
          <LogoImage
            source={require('../assets/images/Logo_KnightFrank.png')}
            resizeMode="contain"
          />
        </Segment.Center>

        <Segment.Center flex={1}>
          <InputLogin.Email
            placeholderTextColor={maintheme.color.input_login.placeholder}
            placeholder="Username"
            ref={input => {
              this.usernameInput = input
            }}
            autoCapitalize="none"
            onChangeText={text => this.handleInput(text, 'username')}
            value={username}
          />
          <InputLogin.Password
            placeholderTextColor={maintheme.color.input_login.placeholder}
            secureTextEntry
            placeholder="Password"
            ref={input => {
              this.passwordInput = input
            }}
            onChangeText={text => this.handleInput(text, 'password')}
            value={password}
          />
        </Segment.Center>

        <Segment.Center flex={1}>
          <Space pdtop={24}>
            <Button
              onPress={async () => {
                const information = {
                  username,
                  password
                }

                const keyInformation = Object.keys(information)

                const validateInfo = keyInformation.reverse().map(info => {
                  if (
                    information[info] === null ||
                    information[info].trim() === ''
                  ) {
                    this[`${info}Input`].focus()
                    return false
                  }

                  return true
                })

                if (validateInfo.indexOf(false) !== -1) return

                Keyboard.dismiss()

                this.handleLoading(true)

                const response = await apiLogin(information)

                if (response.data.access_token === undefined) {
                  this.setState({ resApi: response }, () =>
                    this.handleLoading(false)
                  )
                }

                if (response.data.access_token) {
                  this.setState({ resApi: null }, () =>
                    this.handleLoading(false)
                  )
                  navigation.navigate('App')
                }
              }}
            >
              Sign In
            </Button>
            <Space pdtop={24}>
              <TextLink navigation={navigation}>Forget Password?</TextLink>
            </Space>
          </Space>
        </Segment.Center>

        <Segment.CenterBottom flex={1}>
          <Button
            small={1}
            secondary={1}
            onPress={() => navigation.navigate('RegisterInfo')}
          >
            Create a new account
          </Button>
        </Segment.CenterBottom>

        <ModalLoading
          loading={loading}
          onDismiss={() =>
            resApi
              ? Alert.alert(
                  '',
                  resApi.data.error_description || 'Error',
                  [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                  { cancelable: false }
                )
              : {}
          }
        />
      </Container>
    )
  }
}

export { Login }
