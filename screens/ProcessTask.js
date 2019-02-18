import React, { Component } from 'react'
import { Picker, Platform } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
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

class ProcessTask extends Component {
  constructor(props) {
    super(props)

    const TaskId = props.navigation.getParam('TaskId')

    this.state = {
      taskDetails: {},
      results: [],
      statusSelected: Platform.OS === 'android' ? 0 : null,
      addImage: false,
      imageBefore: [{ TaskID: TaskId, Comment: '', ImageBase64: null }],
      imageAfter: [{ TaskID: TaskId, Comment: '', ImageBase64: null }]
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

  handleAddImageStatus = status => {
    this.setState({ addImage: status })
  }

  render() {
    const { taskDetails, statusSelected, addImage } = this.state

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
                      />
                    )
                  case 2:
                    const { results } = this.state

                    Platform.OS === 'android'
                      ? results.push({
                          ResultID: result.ResultID,
                          Result: result.TypeOptions[0].OptionName,
                          Comment: ''
                        })
                      : null

                    const selectIndex = results.findIndex(
                      rs => rs.ResultID === result.ResultID
                    )

                    const labelSelected =
                      Platform.OS === 'android'
                        ? ''
                        : selectIndex !== -1
                        ? results[selectIndex].Result
                        : ''

                    return (
                      <Select
                        key={order}
                        placeholder={result.ChecklistName}
                        labelSelected={labelSelected}
                        valueSelected={labelSelected}
                        handleValueSelected={text =>
                          this.handleInput(text, result.ResultID)
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
                    console.log('Checkbox')
                    break
                  default:
                    break
                }
              })}
            </Space>
          )
        })
      : null

    console.log('this.state.results :', this.state.results)

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

              <Space>
                <Segment.Center>
                  <Button
                    onPress={() => {
                      this.handleAddImageStatus(true)
                    }}
                  >
                    Add Image
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
