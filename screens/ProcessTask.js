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
  TaskAddImage,
  ModalLoading
} from '../containers'
import { apiGetTasksDetails } from '../api/getTasks'
import { apiSaveTasksDetails } from '../api/SaveTask'
import { apiGetStatusClassLevel } from '../api/getStatusClassLevel'
import { normalize } from '../utilities'

class ProcessTask extends Component {
  constructor(props) {
    super(props)

    this.state = {
      taskDetails: {},
      results: [],
      status: [],
      statusSelected: Platform.OS === 'android' ? 1 : null,
      addImage: false,
      completed: false,
      loading: false,
      resApi: null
    }
  }

  checkStatusSelected = status => {
    const statusList = this.state.status

    if (status) {
      this.setState({
        statusSelected:
          statusList[statusList.findIndex(sta => sta.ClassLevelName === status)]
            .ClassLevelID
      })
    } else {
      this.setState({
        statusSelected:
          Platform.OS === 'android' ? statusList[0].ClassLevelID : null
      })
    }
  }

  componentDidMount() {
    const { navigation } = this.props

    apiGetStatusClassLevel().then(res => {
      this.setState({
        status: res.data
      })
    })

    const TaskId = navigation.getParam('TaskId')

    apiGetTasksDetails(TaskId).then(response => {
      this.setState(
        {
          taskDetails: response.data
        },
        () => this.checkStatusSelected(response.data.ClassLevelName)
      )
    })
  }

  handleLoading = loading => {
    this.setState({ loading })
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
      if (text.trim() === '') {
        results[resultIndex].Result = ''
      } else {
        results[resultIndex].Result = text
      }
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
    if (typeNum) {
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
      }
      return
    }
  }

  crawlerResult = result => {
    const { results } = this.state

    const resultIndex = results.findIndex(rs => rs.ResultID === result.ResultID)

    if (resultIndex === -1) {
      results.push(result)
    } else {
      results[resultIndex] = result
    }

    this.setState({ results })
  }

  handleAddImageStatus = status => {
    Keyboard.dismiss()

    this.setState({ addImage: status })
  }

  submitTask = async () => {
    const { taskDetails, statusSelected, results, completed } = this.state

    const { navigation } = this.props

    const TaskId = navigation.getParam('TaskId')

    if (statusSelected === null) {
      Alert.alert(
        '',
        'Please select status.',
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: false }
      )

      return
    }

    // let saveHistory = false

    // let numResult = 0

    // taskDetails.Details.map(detail => {
    //   detail.Results.map(rs => {
    //     numResult += 1
    //     if (rs.Result !== null) {
    //       saveHistory = true
    //     }
    //   })
    // })

    // const alert = () =>
    //   Alert.alert(
    //     '',
    //     'Please fill up this form',
    //     [{ text: 'OK', onPress: () => {} }],
    //     { cancelable: false }
    //   )

    // const checkEmptyString = results.findIndex(
    //   rs => rs.Result === '' || rs.Result === null
    // )

    // if (saveHistory && checkEmptyString !== -1) {
    //   alert()

    //   return
    // } else if (!saveHistory) {
    //   if (results.length !== numResult || checkEmptyString !== -1) {
    //     alert()

    //     return
    //   }
    // }

    this.handleLoading(true)

    const data = {
      TaskID: TaskId,
      Comment: '',
      Status: completed ? 3 : 2,
      ClassLevelID: statusSelected,
      Results: results
    }

    Keyboard.dismiss()

    const response = await apiSaveTasksDetails(data)

    if (response.data === '') {
      this.handleLoading(false)
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'TasksJobProcess' })]
      })
      navigation.dispatch(resetAction)
      // navigation.navigate('TasksJobProcess')
      return
    }

    this.setState({ resApi: response }, () => this.handleLoading(false))
  }

  render() {
    const {
      taskDetails,
      status,
      statusSelected,
      results,
      addImage,
      completed,
      loading,
      resApi
    } = this.state

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
                          resultIndex !== -1
                            ? results[resultIndex].Result
                            : result.Result
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
                          resultIndex !== -1
                            ? results[resultIndex].Result
                            : result.Result
                        }
                      />
                    )
                  case 2:
                    return (
                      <ProcessTaskSelect
                        key={order}
                        result={result}
                        crawlerResult={this.crawlerResult}
                      />
                    )
                  case 3:
                    return (
                      <ProcessTaskCheckbox
                        key={order}
                        result={result}
                        crawlerResult={this.crawlerResult}
                      />
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
                  status={status}
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

          <ModalLoading
            loading={loading}
            onDismiss={() =>
              resApi
                ? Alert.alert(
                    '',
                    resApi.data || 'Error',
                    [{ text: 'OK', onPress: () => {} }],
                    { cancelable: false }
                  )
                : {}
            }
          />
        </Container>
      </KeyboardAvoidAndScroll>
    )
  }
}

class ProcessTaskSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      resultTaskSelect: null
    }
  }

  componentDidMount() {
    const { result, crawlerResult } = this.props

    if (result.Result) {
      this.setState({
        resultTaskSelect: {
          ResultID: result.ResultID,
          Result: result.Result,
          Comment: ''
        }
      })

      return
    }

    if (Platform.OS === 'android') {
      this.setState(
        {
          resultTaskSelect: {
            ResultID: result.ResultID,
            Result: result.TypeOptions[0].OptionName,
            Comment: ''
          }
        },
        () => crawlerResult(this.state.resultTaskSelect)
      )

      return
    }

    return
  }

  handleSelect = text => {
    const { result, crawlerResult } = this.props

    this.setState(
      {
        resultTaskSelect: {
          ResultID: result.ResultID,
          Result: text,
          Comment: ''
        }
      },
      () => crawlerResult(this.state.resultTaskSelect)
    )

    const valueIndex = result.TypeOptions.findIndex(
      type => type.OptionName === text
    )

    if (result.TypeOptions[valueIndex].IsNormal === false) {
      Alert.alert(
        '',
        result.TypeOptions[valueIndex].MessageErrorEn,
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

  render() {
    const { resultTaskSelect } = this.state

    console.log('resultTaskSelect :', resultTaskSelect)

    const { result } = this.props

    const labelSelected = resultTaskSelect ? resultTaskSelect.Result : null

    return (
      <Select
        placeholder={result.ChecklistName}
        labelSelected={labelSelected}
        valueSelected={labelSelected}
        handleValueSelected={text => this.handleSelect(text)}
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
  }
}

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

class ProcessTaskCheckbox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      resultTaskCheckbox: null
    }
  }

  componentDidMount() {
    const { result } = this.props

    if (result.Result) {
      this.setState({
        resultTaskCheckbox: {
          ResultID: result.ResultID,
          Result: result.Result,
          Comment: ''
        }
      })

      return
    }

    return
  }

  checkIsNormal = info => {
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

  handleCheckbox = info => {
    const { resultTaskCheckbox } = this.state

    const { result, crawlerResult } = this.props

    if (!resultTaskCheckbox) {
      this.checkIsNormal(info)

      this.setState(
        {
          resultTaskCheckbox: {
            ResultID: result.ResultID,
            Result: info.OptionName,
            Comment: ''
          }
        },
        () => crawlerResult(this.state.resultTaskCheckbox)
      )

      return
    }

    const addCheckbox = []

    if (resultTaskCheckbox.Result !== '') {
      resultTaskCheckbox.Result.split(',').map(check => addCheckbox.push(check))
    }

    const checkedIndex = addCheckbox.indexOf(info.OptionName)

    if (checkedIndex === -1) {
      addCheckbox.push(info.OptionName)

      resultTaskCheckbox.Result = addCheckbox.join()

      this.checkIsNormal(info)

      this.setState({ resultTaskCheckbox }, () =>
        crawlerResult(this.state.resultTaskCheckbox)
      )

      return
    }

    addCheckbox.splice(checkedIndex, 1)

    resultTaskCheckbox.Result = addCheckbox.join()

    this.setState({ resultTaskCheckbox }, () =>
      crawlerResult(this.state.resultTaskCheckbox)
    )
  }

  checkCheckedList = checkName => {
    const { resultTaskCheckbox } = this.state

    let checkedList = []

    if (resultTaskCheckbox) {
      checkedList = resultTaskCheckbox.Result.split(',').map(res => res)
    }

    return checkedList.indexOf(checkName)
  }

  render() {
    const { result } = this.props

    return (
      <Space pdtop={8} pdleft={6}>
        <Font.H2 primary={1}>{result.ChecklistName}</Font.H2>
        <Space pdleft={14}>
          <Row flexWrap="wrap">
            {result.TypeOptions.map((option, index) => {
              return (
                <ListCheckboxSpace key={index} pdtop={4} pdbottom={4}>
                  <CheckBoxCustom
                    title={option.OptionName}
                    checkedColor="green"
                    checked={
                      this.checkCheckedList(option.OptionName) !== -1
                        ? true
                        : false
                    }
                    onPress={() => this.handleCheckbox(option)}
                  />
                </ListCheckboxSpace>
              )
            })}
          </Row>
        </Space>
      </Space>
    )
  }
}

export { ProcessTask }
