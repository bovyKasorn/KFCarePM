import React from 'react'
import { Platform, UIManager } from 'react-native'
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
  AssignedTechnicians,
  TasksJobAssigned,
  AcceptTask,
  TasksJobProcess,
  ProcessTask,
  TasksCompleted,
  TasksCompleteDetails
} from './screens'
import { apiGetProfile } from './api/getProfile'

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
              title: 'New Job',
              headerLeft: null
            }
          },

          AssignedTechnicians: {
            screen: AssignedTechnicians,
            navigationOptions: {
              title: 'Assigned'
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
              title: 'Job Assigned',
              headerLeft: null
            }
          },

          AcceptTask: {
            screen: AcceptTask,
            navigationOptions: {
              title: 'Accept'
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
              title: 'Job Process',
              headerLeft: null
            }
          },

          ProcessTask: {
            screen: ProcessTask,
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
              title: 'Completed',
              headerLeft: null
            }
          },

          TasksCompleteDetails: {
            screen: TasksCompleteDetails,
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
    contentComponent: DrawerCustom
  }
)

const AuthLoadingStack = createStackNavigator({
  AuthLoading: {
    screen: AuthLoadingScreen,
    navigationOptions: {
      header: null
    }
  }
})

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingStack,
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
  constructor(props) {
    super(props)

    this.state = {
      profile: null,
      leadTech: false
    }

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  componentDidMount() {
    apiGetProfile().then(res =>
      this.setState({
        profile: res.data,
        leadTech: res.data.RoleID === 6 ? false : true
      })
    )
  }

  getProfile = () => {
    apiGetProfile().then(res =>
      this.setState({
        profile: res.data,
        leadTech: res.data.RoleID === 6 ? false : true
      })
    )
  }

  clearProfile = () => {
    this.setState({ profile: null, leadTech: false })
  }

  switchRoleID = () => {
    const { leadTech } = this.state

    this.setState({ leadTech: !leadTech })
  }

  render() {
    const { profile, leadTech } = this.state

    return (
      <AppContainer
        screenProps={{
          profile,
          getProfile: this.getProfile,
          leadTech,
          clearProfile: this.clearProfile,
          switchRoleID: this.switchRoleID
        }}
      />
    )
  }
}
