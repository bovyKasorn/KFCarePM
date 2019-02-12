import React from 'react'
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation'
import {
  DrawerCustom,
  headerStyle,
  headerTitleStyle,
  headerLeftContainerStyle,
  headerRightContainerStyle,
  headerBackImage,
  HeaderDrawerButton
} from './containers'
import { Login, Register, ForgotPassword, Home } from './screens'

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

const MainNavigatorWithDrawer = createDrawerNavigator(
  {
    MainNavigator: {
      screen: createStackNavigator(
        {
          Home: {
            screen: Home,
            navigationOptions: {
              title: 'All'
            }
          }
        },
        {
          initialRouteName: 'Home',
          defaultNavigationOptions: ({ navigation }) => ({
            headerStyle,
            headerTitleStyle,
            headerLeftContainerStyle,
            headerRightContainerStyle,
            headerBackTitle: null,
            headerBackImage,
            headerRight: <HeaderDrawerButton navigation={navigation} />
          })
        }
      )
    }
  },
  {
    contentComponent: DrawerCustom
  }
)

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Auth: {
        screen: AuthNavigator
      },
      App: {
        screen: MainNavigatorWithDrawer
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
