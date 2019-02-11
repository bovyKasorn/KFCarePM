import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components'
import maintheme from './theme'
import { normalize } from './utilities'

const BackButton = styled(Image)`
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
  //   width: '2%',
  marginRight: normalize(25)
}

const headerBackImage = (
  <BackButton
    source={require('./assets/images/btnBackward.png')}
    resizeMode="stretch"
  />
)

export {
  headerStyle,
  headerTitleStyle,
  headerLeftContainerStyle,
  headerRightContainerStyle,
  headerBackImage
}
