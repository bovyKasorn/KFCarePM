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

class DrawerCustom extends Component {
  render() {
    const { navigation } = this.props

    return (
      <Space
        flex={1}
        style={{
          backgroundColor: '#015151',
          position: 'relative',
          justifyContent: 'center'
        }}
      >
        <DrawerBgImage
          source={require('../assets/images/bgMenu.png')}
          resizeMode="contain"
        />
        <TouchableHighlight
          onPress={() => {
            AsyncStorage.removeItem('@token')
            navigation.navigate('Auth')
          }}
        >
          <Text style={{ color: '#ffffff' }}>Sign out</Text>
        </TouchableHighlight>
        <DrawerItems {...this.props} />
      </Space>
    )
  }
}

export { DrawerCustom }
