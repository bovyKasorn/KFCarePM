import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components'
import { normalize } from '../utilities'

const BulletImage = styled(Image)`
  height: ${normalize(17)};
  width: ${normalize(13)};
  margin-right: ${normalize(13)};
`

const Bullet = props => <BulletImage {...props} resizeMode="contain" />

export { Bullet }
