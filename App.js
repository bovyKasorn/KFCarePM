import React from 'react'
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation'
import {
  headerStyle,
  headerTitleStyle,
  headerLeftContainerStyle,
  headerRightContainerStyle,
  headerBackImage
} from './Topbar'
import { Login, Register, ForgotPassword } from './screens'

const titleTopbar = {
  register: 'Create an Account',
  forgot_pass: 'Forgot Password'
}

const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    RegisterInfo: {
      screen: Register.Info,
      navigationOptions: {
        title: titleTopbar.register
      }
    },
    RegisterSuccess: {
      screen: Register.Success,
      navigationOptions: {
        title: titleTopbar.register,
        headerLeft: null
      }
    },
    ForgotPasswordInfo: {
      screen: ForgotPassword.Info,
      navigationOptions: {
        title: titleTopbar.forgot_pass
      }
    },
    ForgotPasswordSuccess: {
      screen: ForgotPassword.Success,
      navigationOptions: {
        title: titleTopbar.forgot_pass
      }
    }
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerStyle,
      headerTitleStyle,
      headerLeftContainerStyle,
      headerRightContainerStyle,
      headerBackTitle: null,
      headerBackImage
    }
  }
)

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: Register.Info,

      navigationOptions: {
        title: titleTopbar.register
      }
    }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: navigation => ({
      headerStyle,
      headerTitleStyle,
      headerLeftContainerStyle,
      headerRightContainerStyle,
      headerBackTitle: null,
      headerBackImage
      // headerRight: <Test navigation={navigation} />
    })
  }
)

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Auth: {
        screen: AuthNavigator
      },
      App: {
        screen: MainNavigator
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
