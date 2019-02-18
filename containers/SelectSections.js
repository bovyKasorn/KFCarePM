import React, { Component } from 'react'
import { Picker, Platform } from 'react-native'
import { Select } from '../components'
import { apiGetSections } from '../api/getSections'

class SelectSections extends Component {
  render() {
    const { sections, sectionSelected, handleSelectSections } = this.props

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
