import React from 'react'
import styled from 'styled-components'
import { Text, TouchableHighlight } from 'react-native'
import { normalize } from '../utilities'

const theme = {
  btn_primary: {
    color: '#015151',
    active: '#014040'
  },
  btn_secondary: {
    color: '#D0103A',
    active: '#C0003A'
  },
  btn_text: {
    color: '#ffffff'
  }
}

const ButtonPrimary = styled(TouchableHighlight)`
  min-width: 50%;
  align-items: center;
  background-color: ${props =>
    props.secondary === 1
      ? theme.btn_secondary.color
      : theme.btn_primary.color};
  border-radius: 3;
  padding-top: ${props => (props.small === 1 ? normalize(6) : normalize(8))};
  padding-bottom: ${props => (props.small === 1 ? normalize(6) : normalize(8))};
  padding-left: ${normalize(20)};
  padding-right: ${normalize(20)};
`

const ButtonText = styled(Text)`
  color: ${theme.btn_text.color};
  font-size: ${props => (props.small === 1 ? normalize(13) : normalize(14))};
  font-weight: 500;
`

const Button = props => {
  return (
    <ButtonPrimary
      {...props}
      underlayColor={
        props.secondary === 1
          ? theme.btn_secondary.active
          : theme.btn_primary.active
      }
    >
      <ButtonText {...props}>{props.children}</ButtonText>
    </ButtonPrimary>
  )
}

export { Button }
