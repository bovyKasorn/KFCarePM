import React, { Component } from 'react'
import { Picker, Platform } from 'react-native'
import { Select } from '../components'

class SelectStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: [
        { statusID: 0, label: 'Normal' },
        { statusID: 1, label: 'Class A' },
        { statusID: 2, label: 'Class B' },
        { statusID: 3, label: 'Class C' }
      ]
    }
  }

  render() {
    const { status } = this.state

    const { statusSelected, handleSelectStatus } = this.props

    const labelSelected =
      Platform.OS === 'android'
        ? ''
        : statusSelected || statusSelected === 0
        ? status[status.findIndex(sta => sta.statusID === statusSelected)].label
        : ''

    return (
      <Select
        placeholder="Section"
        labelSelected={labelSelected}
        valueSelected={statusSelected}
        handleValueSelected={handleSelectStatus}
      >
        {status.map((sta, index) => {
          return (
            <Picker.Item key={index} label={sta.label} value={sta.statusID} />
          )
        })}
      </Select>
    )
  }
}

export { SelectStatus }
