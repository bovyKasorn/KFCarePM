import React, { Component } from 'react'
import { Image, Animated, Easing } from 'react-native'
import moment from 'moment'
import styled from 'styled-components'
import {
  Font,
  Segment,
  Space,
  Row,
  Divider,
  Bullet,
  Button
} from '../components'
import { SegmentAssignedTechnicians } from '../containers'
import { normalize } from '../utilities'

const TaskImage = styled(Image)`
  height: ${normalize(180)};
`

class TasksDetails extends Component {
  constructor(props) {
    super(props)

    // this.animatedMargin = new Animated.ValueXY({ x: 400, y: 0 })
  }

  // componentDidMount() {
  //   this.test()
  // }

  // test = () => {
  //   this.animatedMargin.setValue({ x: 400, y: 0 })
  //   Animated.timing(this.animatedMargin, {
  //     toValue: { x: 0, y: 0 },
  //     duration: 250,
  //     easing: Easing.linear
  //   }).start()
  // }

  navigateWithTaskID = stack => {
    const { navigation, details } = this.props

    navigation.navigate(stack, {
      TaskId: details.TaskID
    })
  }

  switchRoute = route => {
    switch (route) {
      case 'new':
        this.navigateWithTaskID('AssignedTechnicians')
        break
      case 'assigned':
        this.navigateWithTaskID('AcceptTask')
        break
      case 'process':
        this.navigateWithTaskID('ProcessTask')
        break
      case 'completed':
        this.navigateWithTaskID('TasksCompleteDetails')
        break
      default:
        break
    }
  }

  render() {
    const { navigation, details, tasksActive, assigned } = this.props

    return (
      <Space>
        {/* <Animated.View
          style={{
            transform: this.animatedMargin.getTranslateTransform()
          }}
        > */}
        <Space pdleft={8} pdtop={6}>
          <Font.H1 primary={1}>Machine Name 1</Font.H1>
        </Space>
        {/* </Animated.View> */}

        <Space pdtop={8}>
          <TaskImage
            flex={1}
            source={{
              uri: details.ImageUrl
            }}
            resizeMode="cover"
          />

          <Space flex={1} pdleft={8} pdright={8} pdtop={6}>
            <Space>
              <Font.H3 bold={1}>
                Date:{' '}
                <Font.H3 italic={1}>
                  {details.CreatedDate
                    ? moment(parseInt(details.CreatedDate), 'YYYYMMDD').format(
                        'D/MM/YYYY'
                      )
                    : '-'}
                </Font.H3>
              </Font.H3>
            </Space>

            <Space pdtop={8}>
              <Font.H2 bold={1}>
                Machine Type:{' '}
                <Font.H2>{details.TypeName ? details.TypeName : '-'}</Font.H2>
              </Font.H2>

              <Font.H2 bold={1}>
                Sub Machine : <Font.H2>Lorem Ipsum is simply dummy</Font.H2>
              </Font.H2>

              <Font.H2 bold={1}>
                Machine Location:{' '}
                <Font.H2>{details.Location ? details.Location : '-'}</Font.H2>
              </Font.H2>
            </Space>

            <Space pdtop={8}>
              <Font.H3 primary={1} bold={1}>
                Accept Date:{' '}
                <Font.H3 primary={1} italic={1}>
                  {details.AcceptedDate
                    ? moment(parseInt(details.AcceptedDate), 'YYYYMMDD').format(
                        'D MMM YYYY'
                      )
                    : '-'}
                </Font.H3>
              </Font.H3>

              <Font.H3 primary={1} bold={1}>
                Submit Date:{' '}
                <Font.H3 primary={1} italic={1}>
                  {details.CompletedDate
                    ? moment(
                        parseInt(details.CompletedDate),
                        'YYYYMMDD'
                      ).format('D MMM YYYY')
                    : '-'}
                </Font.H3>
              </Font.H3>
            </Space>
          </Space>
        </Space>

        {assigned ? (
          <SegmentAssignedTechnicians
            navigation={navigation}
            taskId={details.TaskID}
            status={details.ClassLevelName}
          />
        ) : (
          <Space pdleft={20} pdright={20} pdtop={18}>
            <Space>
              <Row>
                <Segment.Center flex={1}>
                  <Font.H2 bold={1}>Technician</Font.H2>
                  <Font.H3>
                    {details.DisplayTechnician
                      ? details.DisplayTechnician
                      : '-'}
                  </Font.H3>
                </Segment.Center>

                <Divider.Vertical />

                <Segment.Center flex={1}>
                  <Font.H2 bold={1}>Status</Font.H2>
                  <Font.H3 primary={1}>
                    {details.ClassLevelName
                      ? `• ${details.ClassLevelName}`
                      : '-'}
                  </Font.H3>
                </Segment.Center>
              </Row>
            </Space>

            <Space pdtop={20} pdbottom={15}>
              <Space>
                <Row>
                  <Bullet small={1} />
                  <Font.H2 primary={1} bold={1}>
                    Comment
                  </Font.H2>
                </Row>

                <Space pdleft={11} pdright={11}>
                  <Font.H2>
                    {details.CommentInventory ? details.CommentInventory : '-'}
                  </Font.H2>
                </Space>
              </Space>

              <Space pdtop={10} pdbottom={16}>
                <Space>
                  <Row>
                    <Bullet small={1} />
                    <Font.H2 primary={1} bold={1}>
                      Technician Comment
                    </Font.H2>
                  </Row>
                  <Space pdleft={11} pdright={11}>
                    <Font.H2>
                      {details.CommentTechnician
                        ? details.CommentTechnician
                        : '-'}
                    </Font.H2>
                  </Space>
                </Space>

                {tasksActive ? (
                  <Space pdtop={16}>
                    <Segment.Center>
                      <Button onPress={() => this.switchRoute(tasksActive)}>
                        {tasksActive === 'new' ? 'Assigned' : 'Details'}
                      </Button>
                    </Segment.Center>
                  </Space>
                ) : null}
              </Space>

              <Divider.Horizontal />
            </Space>
          </Space>
        )}
      </Space>
    )
  }
}

export { TasksDetails }
