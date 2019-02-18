import React, { Component } from 'react'
import { Image } from 'react-native'
import {
  Container,
  Row,
  Space,
  Font,
  Bullet,
  Tab,
  Divider
} from '../components'
import { KeyboardAvoidAndScroll, TasksDetails } from '../containers'
import { apiGetTasksDetails } from '../api/getTasks'
import { apiGetImagesBefore, apiGetImagesAfter } from '../api/TasksImage'

class TasksCompleteDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskDetails: {},
      activeTab: 'before',
      imageBeforeQuery: [],
      imageAfterQuery: []
    }
  }

  componentDidMount() {
    const { navigation } = this.props

    const TaskId = navigation.getParam('TaskId')

    apiGetTasksDetails(TaskId).then(response => {
      this.setState({ taskDetails: response.data })
    })

    apiGetImagesBefore(TaskId).then(res => {
      this.setState({ imageBeforeQuery: res.data })
    })

    apiGetImagesAfter(TaskId).then(res => {
      this.setState({ imageAfterQuery: res.data })
    })
  }

  handleActiveTab = tab => {
    this.setState({ activeTab: tab })
  }

  render() {
    const {
      taskDetails,
      activeTab,
      imageBeforeQuery,
      imageAfterQuery
    } = this.state

    const { navigation } = this.props

    return (
      <KeyboardAvoidAndScroll>
        <Container noPdSide={1}>
          <TasksDetails navigation={navigation} details={taskDetails} />
          <Space pdleft={15} pdright={15}>
            <Row>
              <Space flex={1}>
                <Tab
                  active={activeTab === 'before' ? 1 : 0}
                  onPress={() => this.handleActiveTab('before')}
                >
                  <Row>
                    <Bullet medium={1} />
                    <Font.H2 bold={1}>Image Before</Font.H2>
                  </Row>
                </Tab>
              </Space>

              <Space flex={1}>
                <Tab
                  active={activeTab === 'after' ? 1 : 0}
                  onPress={() => this.handleActiveTab('after')}
                >
                  <Row>
                    <Bullet medium={1} />
                    <Font.H2 bold={1}>Image After</Font.H2>
                  </Row>
                </Tab>
              </Space>
            </Row>

            <Space pdtop={8}>
              {activeTab === 'before'
                ? imageBeforeQuery.map((img, index) => {
                    return (
                      <Space key={index} pdtop={4}>
                        <Row height={100}>
                          <Image
                            flex={3}
                            backgroundColor="#dfdfdf"
                            height="100%"
                            source={{
                              uri: img.ImageUrl
                            }}
                            resizeMode="cover"
                          />

                          <Space flex={5} mgleft={8}>
                            <Font.H2>{img.Comment}</Font.H2>
                          </Space>
                        </Row>
                        <Divider.Horizontal />
                      </Space>
                    )
                  })
                : imageAfterQuery.map((img, index) => {
                    return (
                      <Space key={index} pdtop={4}>
                        <Row height={100}>
                          <Image
                            flex={3}
                            backgroundColor="#dfdfdf"
                            height="100%"
                            source={{
                              uri: img.ImageUrl
                            }}
                            resizeMode="cover"
                          />

                          <Space flex={5} mgleft={8}>
                            <Font.H2>{img.Comment}</Font.H2>
                          </Space>
                        </Row>
                        <Divider.Horizontal />
                      </Space>
                    )
                  })}
            </Space>
          </Space>
        </Container>
      </KeyboardAvoidAndScroll>
    )
  }
}

export { TasksCompleteDetails }
