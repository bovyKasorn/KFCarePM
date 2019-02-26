import React, { Component } from 'react'
import { Picker, Platform } from 'react-native'
import { Select } from '../components'

class SelectStatus extends Component {
  render() {
    const { status, statusSelected, handleSelectStatus } = this.props

    const labelSelected =
      Platform.OS === 'android'
        ? ''
        : statusSelected || statusSelected === 0
        ? status[status.findIndex(sta => sta.ClassLevelID === statusSelected)]
            .ClassLevelName
        : ''

    return (
      <Select
        placeholder="Status"
        labelSelected={labelSelected}
        valueSelected={statusSelected}
        handleValueSelected={handleSelectStatus}
      >
        {status.map((sta, index) => {
          return (
            <Picker.Item
              key={index}
              label={sta.ClassLevelName}
              value={sta.ClassLevelID}
            />
          )
        })}
      </Select>
    )
  }
}

export { SelectStatus }
