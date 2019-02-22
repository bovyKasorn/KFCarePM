import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  AsyncStorage
} from 'react-native'
import { DrawerItems } from 'react-navigation'
import styled from 'styled-components'
import { Container, Space } from '../components'

const DrawerBgImage = styled(Image)`
  position: absolute;
  bottom: 0;
  left: -1115;
  right: 0;
  flex: 1;
  height: 50%;
  width: 500%;
`

const DrawerMenuBtn = styled(TouchableHighlight)`
  width: 100%;
  align-items: center;
  justify-content: center;
  /* background-color: ${props =>
    props.active === 1
      ? props.theme.color.button.secondary.color
      : props.theme.color.button.primary.color}; */
`

const DrawerMenuBtnText = styled(Text)`
  color: ${props => props.theme.color.button.text};
`

class DrawerCustom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 'assigned'
    }
  }

  handleActivePage = page => {
    this.setState({ activePage: page })
  }

  render() {
    const { activePage } = this.state

    const { navigation } = this.props

    return (
      <Container
        noPdSide={1}
        style={{
          backgroundColor: '#015151',
          // position: 'relative',
          alignItems: 'center'
        }}
      >
        {/* <DrawerBgImage
          source={require('../assets/images/bgMenu.png')}
          resizeMode="contain"
        /> */}
        {/* <DrawerItems {...this.props} /> */}

        <DrawerMenuBtn
          active={activePage === 'assigned' ? 1 : 0}
          onPress={() => {
            // console.log('this.btnSignout :', this.btnSignout)
            // AsyncStorage.removeItem('@token')
            navigation.navigate('TasksJobAssigned')
          }}
        >
          <DrawerMenuBtnText>JOB ASSIGNED</DrawerMenuBtnText>
        </DrawerMenuBtn>

        <DrawerMenuBtn
          active={activePage === 'complete' ? 1 : 0}
          onPress={() => {
            this.handleActivePage('complete')
            // console.log('this.btnSignout :', this.btnSignout)
            // AsyncStorage.removeItem('@token')
            navigation.navigate('TasksCompleted')
          }}
        >
          <DrawerMenuBtnText>COMPLETE</DrawerMenuBtnText>
        </DrawerMenuBtn>
      </Container>
    )
  }
}

export { DrawerCustom }
