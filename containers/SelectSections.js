import React, { Component } from 'react'
import { Picker, Platform } from 'react-native'
import { Select } from '../components'
import { apiGetSections } from '../api/getSections'

class SelectSections extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sections: []
    }
  }

  componentDidMount() {
    const { handleSelectSections } = this.props

    apiGetSections().then(res => {
      this.setState({
        sections: res.data
      })

      handleSelectSections(res.data[0].SectionID)
    })
  }

  render() {
    const { sections } = this.state
    const { sectionSelected, handleSelectSections } = this.props

    const labelSelected =
      Platform.OS === 'android'
        ? ''
        : sectionSelected || sectionSelected === 0
        ? sections[sections.findIndex(sec => sec.SectionID === sectionSelected)]
            .SectionNameEn
        : ''

    return (
      <Select
        placeholder="Section"
        labelSelected={labelSelected}
        valueSelected={sectionSelected}
        handleValueSelected={handleSelectSections}
      >
        {sections.map((section, index) => {
          return (
            <Picker.Item
              key={index}
              label={section.SectionNameEn}
              value={section.SectionID}
            />
          )
        })}
      </Select>
    )
  }
}

export { SelectSections }
