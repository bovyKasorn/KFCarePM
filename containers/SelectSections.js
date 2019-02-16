import React, { Component } from 'react'
import { Modal, Picker, Platform } from 'react-native'
import styled from 'styled-components'
import { Input, Space } from '../components'
import apiGetSections from '../api/getSections'

const SelectSectionsContainer = styled(Space)`
  flex-direction: row;
  align-items: flex-end;
  background-color: ${props => props.theme.color.modal.bg};
`

const PickerBgWhite = styled(Picker)`
  background-color: #ffffff;
`

class SelectSections extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      sections: []
    }
  }

  componentDidMount() {
    apiGetSections().then(res =>
      this.setState({
        sections: res.data
      })
    )
  }

  handleModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  render() {
    const { modalVisible, sections } = this.state
    const { sectionSelected, updateSection } = this.props

    const pickerSections =
      Platform.OS === 'android' ? (
        <Picker selectedValue={sectionSelected} onValueChange={updateSection}>
          {sections.map((section, index) => {
            return (
              <Picker.Item
                key={index}
                label={section.SectionNameEn}
                value={section.SectionID}
              />
            )
          })}
        </Picker>
      ) : (
        <PickerBgWhite
          selectedValue={sectionSelected}
          onValueChange={updateSection}
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
        </PickerBgWhite>
      )

    return (
      <Space>
        {Platform.OS === 'android' ? (
          pickerSections
        ) : (
          <Space>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
            >
              <SelectSectionsContainer
                flex={1}
                onStartShouldSetResponder={() => this.handleModalVisible(false)}
              >
                <Space flex={1}>{pickerSections}</Space>
              </SelectSectionsContainer>
            </Modal>
            <Input
              placeholder="Section"
              editable={false}
              value={
                sectionSelected
                  ? sections[
                      sections.findIndex(
                        sec => sec.SectionID === sectionSelected
                      )
                    ].SectionNameEn
                  : ''
              }
              onTouchStart={() => this.handleModalVisible(true)}
            />
          </Space>
        )}
      </Space>
    )
  }
}

export { SelectSections }
