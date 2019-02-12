import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { DrawerItems } from 'react-navigation'

class DrawerCustom extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View flex={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableHighlight onPress={() => navigation.navigate('Home2')}>
          <Text>Drawer</Text>
        </TouchableHighlight>
        {/* <DrawerItems {...this.props} /> */}
      </View>
    )
  }
}

export { DrawerCustom }
