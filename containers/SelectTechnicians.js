import React, { Component } from 'react'
import { Modal, Picker, Platform } from 'react-native'
import styled from 'styled-components'
import { Input, Space, Row, Button } from '../components'
import { normalize } from '../utilities'

const SelectSectionsContainer = styled(Space)`
  flex-direction: row;
  align-items: flex-end;
  background-color: ${props => props.theme.color.modal.bg};
`

const PickerBgWhite = styled(Picker)`
  background-color: #ffffff;
`

const ButtonTech = styled(Button)`
  padding-top: ${normalize(3.6)};
  padding-bottom: ${normalize(3.9)};
`

class SelectTechnicians extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: 'none'
    }
  }

  handleModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }
  render() {
    const { modalVisible } = this.state

    const {
      technicians,
      technicianSelected,
      handleSelectTechnicians,
      addMoreTechnicians,
      deleteTechnicians
    } = this.props

    const technicianLists = technicians.map((tech, index) => {
      return (
        <Picker.Item
          key={index}
          label={tech.TechnicianName}
          value={tech.TechnicianID}
        />
      )
    })

    return technicianSelected.map((tech, index) => {
      return (
        <Row key={index}>
          <Space flex={5}>
            {Platform.OS === 'android' ? (
              <Picker
                selectedValue={tech.TechnicianID}
                onValueChange={e => handleSelectTechnicians(e, index)}
              >
                {technicianLists}
              </Picker>
            ) : (
              <Space>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible === `select${index}`}
                >
                  <SelectSectionsContainer
                    flex={1}
                    onStartShouldSetResponder={() =>
                      this.handleModalVisible('none')
                    }
                  >
                    <Space flex={1}>
                      <PickerBgWhite
                        selectedValue={tech.TechnicianID}
                        onValueChange={e => handleSelectTechnicians(e, index)}
                      >
                        {technicianLists}
                      </PickerBgWhite>
                    </Space>
                  </SelectSectionsContainer>
                </Modal>
                <Input
                  placeholder="Technician"
                  editable={false}
                  value={tech.TechnicianName}
                  onTouchStart={() => this.handleModalVisible(`select${index}`)}
                />
              </Space>
            )}
          </Space>
          {index === 0 ? (
            <Space flex={1} pdtop={4} pdbottom={3} pdleft={8}>
              <ButtonTech onPress={() => addMoreTechnicians()}>+</ButtonTech>
            </Space>
          ) : (
            <Space flex={1} pdtop={4} pdbottom={3} pdleft={8}>
              <ButtonTech
                secondary={1}
                onPress={() => deleteTechnicians(index)}
              >
                -
              </ButtonTech>
            </Space>
          )}
        </Row>
      )
    })
  }
}

export { SelectTechnicians }
