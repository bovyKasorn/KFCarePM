import React from 'react'
import { Text, Image, TouchableHighlight } from 'react-native'
import styled from 'styled-components'
import { Button, InputLogin, Container, Segment, Space } from '../components'
import { normalize } from '../utilities'

const LoginBackground = styled(Image)`
  position: absolute;
  bottom: 0;
  left: -10;
  right: 0;
  flex: 1;
  height: 52%;
  width: 280%;
`

const TextLinkText = styled(Text)`
  color: ${props => props.theme.color.textlink};
  text-decoration-line: underline;
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

  render() {
    const { navigation } = this.props

    return (
      <Container>
        <LoginBackground source={require('../assets/images/bgLogin.png')} />
        {/* <Image
          source={require('../assets/images/bgLogin.png')}
          resizeMode="contain"
        /> */}
        <Segment.Center flex={1}>
          <InputLogin placeholder="Email" />
          <InputLogin password placeholder="Password" />
        </Segment.Center>
        <Segment.Center flex={1}>
          <Button onPress={() => navigation.navigate('Home')}>Sign In</Button>
          <Space pdtop={normalize(24)}>
            <TextLink navigation={navigation}>Forget Password?</TextLink>
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
      </Container>
    )
  }
}

export { Login }
