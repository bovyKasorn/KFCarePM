import React from 'react'
import { Image, TouchableHighlight } from 'react-native'
import styled from 'styled-components'
import maintheme from '../theme'
import { normalize } from '../utilities'

const HeaderBackIcon = styled(Image)`
  width: 100%;
  height: ${normalize(26)};
`

const headerStyle = {
  backgroundColor: maintheme.color.topbar.bg,
  borderBottomWidth: 0
}

const headerTitleStyle = {
  fontSize: normalize(14.5),
  color: maintheme.color.topbar.title
}

const headerLeftContainerStyle = {
  width: '2%',
  marginLeft: normalize(25)
}

const headerRightContainerStyle = {
  width: '6%',
  marginRight: normalize(23)
}

const headerBackImage = (
  <HeaderBackIcon
    source={require('../assets/images/btnBackward.png')}
    resizeMode="stretch"
  />
)

const DrawerButton = styled(TouchableHighlight)`
  width: 100%;
  height: 32%;
`

const DrawerIcon = styled(Image)`
  width: 100%;
  height: 100%;
`

const HeaderDrawerButton = props => {
  const { navigation } = props

  return (
    <DrawerButton
      underlayColor="transparent"
      onPress={() => navigation.openDrawer()}
    >
      <DrawerIcon
        source={require('../assets/images/hambMenu.png')}
        resizeMode="stretch"
      />
    </DrawerButton>
  )
}

export {
  headerStyle,
  headerTitleStyle,
  headerLeftContainerStyle,
  headerRightContainerStyle,
  headerBackImage,
  HeaderDrawerButton
}
