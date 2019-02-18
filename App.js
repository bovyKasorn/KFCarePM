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
  AssignedTechnicians,
  TasksJobAssigned,
  AcceptTask,
  TasksJobProcess,
  ProcessTask,
  TasksCompleted,
  TasksCompleteDetails
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
  // headerRight: <HeaderDrawerButton navigation={navigation} />
})

const TasksNewJobStack = createStackNavigator(
  {
    TasksNewJob: {
      screen: TasksNewJob,
      navigationOptions: {
        title: 'New Job'
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
)

const TasksJobAssignedStack = createStackNavigator(
  {
    TasksJobAssigned: {
      screen: TasksJobAssigned,
      navigationOptions: {
        title: 'Job Assigned'
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
)

const TasksJobProcessStack = createStackNavigator(
  {
    TasksJobProcess: {
      screen: TasksJobProcess,
      navigationOptions: {
        title: 'Job Process'
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
)

const TasksCompletedStack = createStackNavigator(
  {
    TasksCompleted: {
      screen: TasksCompleted,
      navigationOptions: {
        title: 'Completed'
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

// const AppStackWithDrawer = createDrawerNavigator(
//   {
//     TasksNewJob: TasksNewJobStack,

//     TasksJobAssigned: TasksJobAssignedStack,

//     TasksJobProcess: TasksJobProcessStack,

//     TasksCompleted: TasksCompletedStack
//   },
//   {
//     initialRouteName: 'TasksNewJob',
//     contentComponent: DrawerCustom
//   }
// )

const AppStackWithDrawer = createSwitchNavigator(
  {
    TasksNewJob: TasksNewJobStack,

    TasksJobAssigned: TasksJobAssignedStack,

    TasksJobProcess: TasksJobProcessStack,

    TasksCompleted: TasksCompletedStack
  },
  {
    initialRouteName: 'TasksNewJob'
  }
)

const AuthLoadingStack = createStackNavigator({
  AuthLoading: {
    screen: AuthLoadingScreen
    // navigationOptions: {
    //   header: null
    // }
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
  render() {
    return <AppContainer />
  }
}
