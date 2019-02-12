import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components'
import { normalize } from '../utilities'

const BulletImage = styled(Image)`
  width: ${props => (props.small === 1 ? normalize(5) : normalize(11))};
  height: ${normalize(17)};
  margin-right: ${props => (props.small === 1 ? normalize(6) : normalize(13))};
  align-self: center;
`

const Bullet = props => (
  <BulletImage
    {...props}
    source={require('../assets/images/bulletHeadXL.png')}
    resizeMode="contain"
  />
)

export { Bullet }
