import React from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import styled from 'styled-components'
import { Button, InputLogin, Container, Segment } from '../components'

const LoginBackground = styled(Image)`
  position: absolute;
  bottom: 0;
  left: -10;
  right: 0;
  flex: 1;
  height: 52%;
  width: 280%;
`

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
        <Segment.Center>
          <InputLogin placeholder="Email" />
          <InputLogin password placeholder="Password" />
        </Segment.Center>
        <Segment.Center>
          <Button onPress={() => console.log('123')}>Sign In</Button>
          <TouchableHighlight
            underlayColor="#ffffff"
            onPress={() => console.log('123')}
          >
            <Text style={{ textDecorationLine: 'underline' }}>
              Forgot Password?
            </Text>
          </TouchableHighlight>
        </Segment.Center>
        <Segment.CenterBottom>
          <Button
            small={1}
            secondary={1}
            onPress={() => navigation.navigate('Register')}
          >
            Create a new account
          </Button>
        </Segment.CenterBottom>
      </Container>
    )
  }
}

export { Login }
