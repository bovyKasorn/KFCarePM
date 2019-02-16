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
import {
  AuthLoadingScreen,
  Login,
  Register,
  ForgotPassword,
  TasksNewJob,
  TasksJobAssigned,
  TasksJobProcess,
  TasksCompleted
} from './screens'

const titleTopbar = {
  register: 'Create an Account',
  forgot_pass: 'Forgot Password'
}

const AuthStack = createStackNavigator(
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
        title: titleTopbar.forgot_pass,
        headerLeft: null
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

const defaultNavigationOptions = ({ navigation }) => ({
  headerStyle,
  headerTitleStyle,
  headerLeftContainerStyle,
  headerRightContainerStyle,
  headerBackTitle: null,
  headerBackImage,
  headerRight: <HeaderDrawerButton navigation={navigation} />
})

const AppStackWithDrawer = createDrawerNavigator(
  {
    AppStack: createSwitchNavigator({
      TasksNewJob: createStackNavigator(
        {
          TasksNewJob: {
            screen: TasksNewJob,
            navigationOptions: {
              title: 'New Job'
            }
          }
        },
        {
          defaultNavigationOptions
        }
      ),

      TasksJobAssigned: createStackNavigator(
        {
          TasksJobAssigned: {
            screen: TasksJobAssigned,
            navigationOptions: {
              title: 'Job Assigned'
            }
          }
        },
        {
          defaultNavigationOptions
        }
      ),

      TasksJobProcess: createStackNavigator(
        {
          TasksJobProcess: {
            screen: TasksJobProcess,
            navigationOptions: {
              title: 'Job Process'
            }
          }
        },
        {
          defaultNavigationOptions
        }
      ),

      TasksCompleted: createStackNavigator(
        {
          TasksCompleted: {
            screen: TasksCompleted,
            navigationOptions: {
              title: 'Completed'
            }
          }
        },
        {
          defaultNavigationOptions
        }
      )
    })
  },
  {
    initialRouteName: 'AppStack',
    contentComponent: DrawerCustom
  }
)

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: createStackNavigator({
        AuthLoading: {
          screen: AuthLoadingScreen
          // navigationOptions: {
          //   header: null
          // }
        }
      }),
      Auth: {
        screen: AuthStack
      },

      App: { screen: AppStackWithDrawer }
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
)

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}
