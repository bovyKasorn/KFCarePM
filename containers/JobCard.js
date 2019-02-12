import React, { Component } from 'react'
import { Image } from 'react-native'
import { Font, Segment, Space, Row, Divider, Bullet } from '../components'
import { normalize } from '../utilities'

class JobCard extends Component {
  render() {
    return (
      <Space>
        {/* <Segment.Center> */}
        <Space pdleft={8} pdtop={6}>
          <Font.H1>Machine Name 1</Font.H1>
        </Space>
        {/* </Segment.Center> */}

        <Space pdtop={8}>
          {/* <Row> */}
          <Image
            flex={1}
            style={{ height: normalize(180) }}
            source={{
              uri:
                'https://amp.businessinsider.com/images/5b86ba9e1982d88a308b4aa0-750-563.jpg'
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
          {/* </Row> */}
        </Space>

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
            </Space>

            <Divider.Horizontal />
          </Space>
        </Space>
      </Space>
    )
  }
}

export { JobCard }
