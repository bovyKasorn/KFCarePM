import React from 'react'
import { TouchableHighlight } from 'react-native'
import styled from 'styled-components'
import { Space } from '../components'
import { normalize } from '../utilities'

const ButtonTab = styled(TouchableHighlight)`
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.color.button.bgtab};
  padding-top: ${normalize(4)};
  padding-bottom: ${normalize(4)};
  padding-left: ${normalize(18)};
  padding-right: ${normalize(18)};
  border-bottom-width: ${props => (props.active === 1 ? 2 : 0.5)};
  border-bottom-color: ${props =>
    props.active === 1
      ? props.theme.color.button.primary.color
      : props.theme.color.button.border};
  opacity: ${props => (props.active === 1 ? 1 : 0.6)};
`

const Tab = props => {
  return <ButtonTab {...props} underlayColor="#ffffff">{props.children}</ButtonTab>
}

export { Tab }
