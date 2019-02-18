import React, { Component } from 'react'
import { Modal, Picker, Platform } from 'react-native'
import styled from 'styled-components'
import { Input, Space, Font } from '../components'

const SelectSectionsContainer = styled(Space)`
  flex-direction: row;
  align-items: flex-end;
  background-color: ${props => props.theme.color.modal.bg};
`

const PickerBgWhite = styled(Picker)`
  background-color: #ffffff;
`

class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false
    }
  }

  handleModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  render() {
    const { modalVisible } = this.state

    const {
      placeholder,
      labelSelected,
      valueSelected,
      handleValueSelected
    } = this.props

    const picker =
      Platform.OS === 'android' ? (
        <Picker
          selectedValue={valueSelected}
          onValueChange={handleValueSelected}
        >
          {this.props.children}
        </Picker>
      ) : (
        <PickerBgWhite
          selectedValue={valueSelected}
          onValueChange={handleValueSelected}
        >
          {this.props.children}
        </PickerBgWhite>
      )

    return (
      <Space flex={1}>
        {Platform.OS === 'android' ? (
          <Space pdtop={8}>
            <Space pdleft={6}>
              <Font.H2 primary={1}>{placeholder}</Font.H2>
            </Space>

            {picker}
          </Space>
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
                <Space flex={1}>{picker}</Space>
              </SelectSectionsContainer>
            </Modal>
            <Input
              placeholder={placeholder}
              editable={false}
              value={labelSelected}
              onTouchStart={() => this.handleModalVisible(true)}
            />
          </Space>
        )}
      </Space>
    )
  }
}

export { Select }
