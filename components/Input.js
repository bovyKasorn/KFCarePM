import React from 'react'
import { TextInput } from 'react-native'
import styled from 'styled-components'
import { normalize } from '../utilities'

const FormInput = styled(TextInput)`
  border-width: 1;
  border-color: #dfdfdf;
  border-radius: 4;
  padding-top: ${normalize(8)};
  padding-bottom: ${normalize(8)};
  padding-left: ${normalize(13)};
  padding-right: ${normalize(13)};
  margin-top: ${normalize(4)};
  margin-bottom: ${normalize(4)};
`

const Input = props => <FormInput {...props} placeholderTextColor="#cfcfcf" />

export { Input }
