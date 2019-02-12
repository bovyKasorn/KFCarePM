import React from 'react'
import styled from 'styled-components'
import { Text, TouchableHighlight } from 'react-native'
import maintheme from '../theme'
import { normalize } from '../utilities'

const ButtonPrimary = styled(TouchableHighlight)`
  min-width: 45%;
  align-items: center;
  background-color: ${props =>
    props.secondary === 1
      ? props.theme.color.button.secondary.color
      : props.theme.color.button.primary.color};
  border-radius: 3;
  padding-top: ${props => (props.small === 1 ? normalize(6) : normalize(8))};
  padding-bottom: ${props => (props.small === 1 ? normalize(6) : normalize(8))};
  padding-left: ${normalize(18)};
  padding-right: ${normalize(18)};
`

const ButtonText = styled(Text)`
  color: ${props => props.theme.color.button.text};
  font-size: ${props => (props.small === 1 ? normalize(13) : normalize(14))};
  font-weight: 500;
`

const Button = props => {
  return (
    <ButtonPrimary
      {...props}
      underlayColor={
        props.secondary === 1
          ? maintheme.color.button.secondary.active
          : maintheme.color.button.primary.active
      }
    >
      <ButtonText {...props}>{props.children}</ButtonText>
    </ButtonPrimary>
  )
}

export { Button }
