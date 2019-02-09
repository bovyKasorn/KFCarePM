import React, { Component } from 'react'
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation'
import { Image } from 'react-native'
import styled from 'styled-components'
import { Login, Register } from './screens'
import { normalize } from './utilities'

const theme = {
  topbar: {
    color: '#D0103A',
    margin: normalize(25),
    font: {
      size: normalize(16),
      color: '#ffffff'
    }
  }
}

const BackButton = styled(Image)`
  width: 100%;
  height: ${normalize(26)};
`

const TopbarAuth = {
  headerStyle: {
    backgroundColor: theme.topbar.color,
    borderBottomWidth: 0
  },
  headerTitleStyle: {
    fontSize: theme.topbar.font.size,
    color: theme.topbar.font.color
  },
  headerLeftContainerStyle: {
    width: '2%',
    marginLeft: theme.topbar.margin
  },
  headerBackTitle: null,
  headerBackImage: (
    <BackButton
      source={require('./assets/images/btnBackward.png')}
      resizeMode="stretch"
    />
  )
}

const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Register: {
      screen: Register
    }
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: TopbarAuth
  }
)

const Navigator = createStackNavigator({
  Details: { screen: Register }
})

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Auth: {
        screen: AuthNavigator
      },
      App: {
        screen: Navigator
      }
    },
    {
      initialRouteName: 'Auth'
    }
  )
)

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}
