import React from 'react'
import { AsyncStorage, LayoutAnimation, Animated, Easing } from 'react-native'
import { Container, Segment } from '../components'

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)

    this._bootstrapAsync()

    this.animatedLogo = new Animated.Value(0)
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('@token')

    const CustomLayoutLinear = {
      duration: 200,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      },
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      },
      delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      }
    }

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    setTimeout(() => {
      LayoutAnimation.configureNext(CustomLayoutLinear)
      this.props.navigation.navigate(userToken ? 'App' : 'Auth')
    }, 1650)
  }

  componentDidMount() {
    setTimeout(() => {
      this.handleAnimatedLogo()
    }, 1500)
  }

  handleAnimatedLogo = () => {
    this.animatedLogo.setValue(0)
    Animated.timing(this.animatedLogo, {
      toValue: 1,
      duration: 150,
      easing: Easing.linear
    }).start()
  }

  // Render any loading content that you like here
  render() {
    const logoSize = this.animatedLogo.interpolate({
      inputRange: [0, 1],
      outputRange: ['80%', '300%']
    })

    const logoOpacity = this.animatedLogo.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    })

    return (
      <Container>
        <Segment.CenterMiddle flex={1}>
          <Animated.Image
            style={{
              width: logoSize,
              opacity: logoOpacity
            }}
            source={require('../assets/images/Logo_KnightFrank.png')}
            resizeMode="contain"
          />
        </Segment.CenterMiddle>
      </Container>
    )
  }
}

export { AuthLoadingScreen }
