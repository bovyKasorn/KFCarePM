import React, { Component } from 'react'
import { Picker, Platform, Alert, Keyboard } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { StackActions, NavigationActions } from 'react-navigation'
import styled from 'styled-components'
import {
  Container,
  Row,
  Space,
  Button,
  Bullet,
  Font,
  Input,
  Select,
  Segment,
  Divider
} from '../components'
import {
  KeyboardAvoidAndScroll,
  TasksDetails,
  SelectStatus,
  TaskAddImage
} from '../containers'
import { apiGetTasksDetails } from '../api/getTasks'
import { apiSaveTasksDetails } from '../api/SaveTask'
import { normalize } from '../utilities'

const ListCheckboxSpace = styled(Space)`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 49%;
`

const CheckBoxCustom = props => {
  return (
    <CheckBox
      {...props}
      checkedColor="green"
      containerStyle={{
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 0,
        padding: 0,
        margin: 0
      }}
      textStyle={{
        fontSize: normalize(12),
        fontWeight: '400'
      }}
    />
  )
}

class ProcessTask extends Component {
  constructor(props) {
    super(props)

    this.state = {
      taskDetails: {},
      results: [],
      statusSelected: Platform.OS === 'android' ? 0 : null,
      addImage: false,
      completed: false
    }
  }

  componentDidMount() {
    const { navigation } = this.props

    const TaskId = navigation.getParam('TaskId')

    apiGetTasksDetails(TaskId).then(response => {
      this.setState({ taskDetails: response.data })
    })
  }

  handleSelectStatus = status => {
    this.setState({ statusSelected: status })
  }

  handleInput = (text, id) => {
    const { results } = this.state

    const resultIndex = results.findIndex(result => result.ResultID === id)

    if (resultIndex === -1) {
      results.push({
        ResultID: id,
        Result: text,
        Comment: ''
      })
    } else {
      results[resultIndex].Result = text
    }

    this.setState({ results })
  }

  checkInputNumeric = (id, typeNum) => {
    const { results } = this.state

    const resultIndex = results.findIndex(result => result.ResultID === id)

    if (resultIndex === -1) {
      return
    }

    const value = results[resultIndex].Result

    if (parseInt(value) < typeNum.Min || parseInt(value) > typeNum.Max) {
      Alert.alert(
        '',
        `Min: ${typeNum.Min} Max: ${typeNum.Max}`,
        [
          {
            text: 'OK',
            onPress: () => {
              results[resultIndex].Result = null

              this.setState({ results })
            }
          }
        ],
        { cancelable: false }
      )

      return
    }
  }

  handleSelect = (text, id, typeOp) => {
    const { results } = this.state

    console.log('text :', text)

    console.log('id :', id)

    console.log('typeOp :', typeOp)

    const resultIndex = results.findIndex(result => result.ResultID === id)

    if (resultIndex === -1) {
      results.push({
        ResultID: id,
        Result: text,
        Comment: ''
      })
    } else {
      results[resultIndex].Result = text
    }

    this.setState({ results })

    const valueIndex = typeOp.findIndex(type => type.OptionName === text)

    if (typeOp[valueIndex].IsNormal === false) {
      Alert.alert(
        '',
        typeOp[valueIndex].MessageErrorEn,
        [
          {
            text: 'OK',
            onPress: () => {}
          }
        ],
        { cancelable: false }
      )
    }
  }

  handleCheckbox = (info, id) => {
    const { results } = this.state

    const resultIndex = results.findIndex(result => result.ResultID === id)

    const checkIsNormal = () => {
      if (info.IsNormal === false) {
        Alert.alert(
          '',
          info.MessageErrorEn,
          [
            {
              text: 'OK',
              onPress: () => {}
            }
          ],
          { cancelable: false }
        )
      }
    }

    if (resultIndex === -1) {
      results.push({
        ResultID: id,
        Result: [{ CheckBoxName: info.OptionName }],
        Comment: ''
      })

      checkIsNormal()
    } else {
      const checkedIndex = results[resultIndex].Result.findIndex(
        checked => checked.CheckBoxName === info.OptionName
      )

      if (checkedIndex === -1) {
        results[resultIndex].Result.push({ CheckBoxName: info.OptionName })

        checkIsNormal()
      } else {
        results[resultIndex].Result.splice(checkedIndex, 1)
      }
    }

    this.setState({ results })
  }

  handleAddImageStatus = status => {
    Keyboard.dismiss()

    this.setState({ addImage: status })
  }

  submitTask = async () => {
    const { statusSelected, results, completed } = this.state

    const { navigation } = this.props

    const TaskId = navigation.getParam('TaskId')

    if (statusSelected === null) {
      Alert.alert(
        '',
        'Please select status.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      )

      return
    }

    const data = {
      TaskID: TaskId,
      Comment: '',
      Status: statusSelected,
      ClassLevel: completed ? 3 : 2,
      Results: results
    }

    Keyboard.dismiss()

    const response = await apiSaveTasksDetails(data)

    console.log('response :', response)
  }

  render() {
    const {
      taskDetails,
      statusSelected,
      results,
      addImage,
      completed
    } = this.state

    console.log('results :', results)

    const { navigation } = this.props

    const taskDetail = taskDetails.Details
      ? taskDetails.Details.map((detail, index) => {
          return (
            <Space key={index} pdbottom={8}>
              <Row>
                <Bullet small={1} />
                <Font.H2 primary={1} bold={1}>
                  {detail.InspectionPointName}
                </Font.H2>
              </Row>

              {detail.Results.map((result, order) => {
                const resultIndex = results.findIndex(
                  rs => rs.ResultID === result.ResultID
                )

                switch (result.ResultTypeID) {
                  case 0:
                    return (
                      <Input
                        key={order}
                        autoCapitalize="none"
                        placeholder={result.ChecklistName}
                        onChangeText={text =>
                          this.handleInput(text, result.ResultID)
                        }
                        value={
                          resultIndex !== -1 ? results[resultIndex].Result : ''
                        }
                      />
                    )
                  case 1:
                    return (
                      <Input
                        key={order}
                        keyboardType="numeric"
                        autoCapitalize="none"
                        placeholder={result.ChecklistName}
                        onChangeText={text =>
                          this.handleInput(text, result.ResultID)
                        }
                        onBlur={() =>
                          this.checkInputNumeric(
                            result.ResultID,
                            result.TypeNumber
                          )
                        }
                        value={
                          resultIndex !== -1 ? results[resultIndex].Result : ''
                        }
                      />
                    )
                  case 2:
                    Platform.OS === 'android'
                      ? results.push({
                          ResultID: result.ResultID,
                          Result: result.TypeOptions[0].OptionName,
                          Comment: ''
                        })
                      : null

                    const labelSelected =
                      Platform.OS === 'android'
                        ? ''
                        : resultIndex !== -1
                        ? results[resultIndex].Result
                        : ''

                    return (
                      <Select
                        key={order}
                        placeholder={result.ChecklistName}
                        labelSelected={labelSelected}
                        valueSelected={labelSelected}
                        handleValueSelected={text =>
                          this.handleSelect(
                            text,
                            result.ResultID,
                            result.TypeOptions
                          )
                        }
                      >
                        {result.TypeOptions.map((option, count) => {
                          return (
                            <Picker.Item
                              key={count}
                              label={option.OptionName}
                              value={option.OptionName}
                            />
                          )
                        })}
                      </Select>
                    )
                  case 3:
                    let checkedList = []

                    if (resultIndex !== -1) {
                      checkedList = results[resultIndex].Result
                    }

                    const checkCheckedList = checkName => {
                      return checkedList.findIndex(
                        check => check.CheckBoxName === checkName
                      )
                    }

                    return (
                      <Space key={order} pdtop={8} pdleft={6}>
                        <Font.H2 primary={1}>{result.ChecklistName}</Font.H2>
                        <Space pdleft={14}>
                          <Row flexWrap="wrap">
                            {result.TypeOptions.map((option, index) => {
                              return (
                                <ListCheckboxSpace
                                  key={index}
                                  pdtop={4}
                                  pdbottom={4}
                                >
                                  <CheckBoxCustom
                                    title={option.OptionName}
                                    checkedColor="green"
                                    checked={
                                      checkCheckedList(option.OptionName) !== -1
                                        ? true
                                        : false
                                    }
                                    onPress={() =>
                                      this.handleCheckbox(
                                        option,
                                        result.ResultID
                                      )
                                    }
                                  />
                                </ListCheckboxSpace>
                              )
                            })}
                          </Row>
                        </Space>
                      </Space>
                    )

                  default:
                    break
                }
              })}
            </Space>
          )
        })
      : null

    return (
      <KeyboardAvoidAndScroll>
        <Container noPdSide={1}>
          <TasksDetails navigation={navigation} details={taskDetails} />
          {addImage ? (
            <TaskAddImage
              taskId={navigation.getParam('TaskId')}
              handleAddImageStatus={this.handleAddImageStatus}
            />
          ) : (
            <Space pdleft={15} pdright={15}>
              <Space>
                <SelectStatus
                  statusSelected={statusSelected}
                  handleSelectStatus={this.handleSelectStatus}
                />
              </Space>

              <Space pdtop={8}>{taskDetail}</Space>

              <Space pdtop={12} pdbottom={14}>
                <Segment.Center>
                  <Button
                    small={1}
                    onPress={() => {
                      this.handleAddImageStatus(true)
                    }}
                  >
                    Add Image
                  </Button>
                </Segment.Center>
              </Space>

              <Divider.Horizontal />

              <Space pdtop={12}>
                <Segment.Center>
                  <CheckBoxCustom
                    title="Complete"
                    checkedColor="green"
                    checked={completed}
                    onPress={() => this.setState({ completed: !completed })}
                  />
                </Segment.Center>
              </Space>

              <Space pdtop={8}>
                <Segment.Center>
                  <Button
                    onPress={() => {
                      this.submitTask()
                    }}
                  >
                    Save
                  </Button>
                </Segment.Center>
              </Space>
            </Space>
          )}
        </Container>
      </KeyboardAvoidAndScroll>
    )
  }
}

export { ProcessTask }
