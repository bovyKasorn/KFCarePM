import React, { Component } from 'react'
import { Image } from 'react-native'
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

    // console.log('details :', details)

    return (
      <Space>
        <Space pdleft={8} pdtop={6}>
          <Font.H1 primary={1}>Machine Name 1</Font.H1>
        </Space>

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
                Date: <Font.H3 italic={1}>20/10/2018</Font.H3>
              </Font.H3>
            </Space>

            <Space pdtop={8}>
              <Font.H2 bold={1}>
                Machine Type: <Font.H2>Lorem Ipsum is simply dummy</Font.H2>
              </Font.H2>

              <Font.H2 bold={1}>
                Sub Machine : <Font.H2>Lorem Ipsum is simply dummy</Font.H2>
              </Font.H2>

              <Font.H2 bold={1}>
                Machine Location: <Font.H2>Lorem Ipsum is simply dummy</Font.H2>
              </Font.H2>
            </Space>

            <Space pdtop={8}>
              <Font.H3 primary={1} bold={1}>
                Accept Date:{' '}
                <Font.H3 primary={1} italic={1}>
                  2 Jan 2019
                </Font.H3>
              </Font.H3>

              <Font.H3 primary={1} bold={1}>
                Submit Date:{' '}
                <Font.H3 primary={1} italic={1}>
                  3 Jan 2019
                </Font.H3>
              </Font.H3>
            </Space>
          </Space>
        </Space>

        {assigned ? (
          <SegmentAssignedTechnicians
            navigation={navigation}
            taskId={details.TaskID}
          />
        ) : (
          <Space pdleft={20} pdright={20} pdtop={18}>
            <Space>
              <Row>
                <Segment.Center flex={1}>
                  <Font.H2 bold={1}>Technician</Font.H2>
                  <Font.H3>Alexander Martin</Font.H3>
                </Segment.Center>

                <Divider.Vertical />

                <Segment.Center flex={1}>
                  <Font.H2 bold={1}>Status</Font.H2>
                  <Font.H3 primary={1}>• Normal</Font.H3>
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
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Font.H2>
                </Space>
              </Space>

              <Space pdtop={10} pdbottom={16}>
                <Row>
                  <Bullet small={1} />
                  <Font.H2 primary={1} bold={1}>
                    Technician Comment
                  </Font.H2>
                </Row>

                <Space pdleft={11} pdright={11}>
                  <Font.H2>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Font.H2>
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
