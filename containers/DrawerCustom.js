import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  AsyncStorage
} from 'react-native'
import styled from 'styled-components'
import { Container, Space, Divider, Row, Segment } from '../components'
import { normalize } from '../utilities'
import { apiGetProfile } from '../api/getProfile'

const DrawerBgImage = styled(Image)`
  position: absolute;
  bottom: 0;
  left: -1115;
  right: 0;
  flex: 1;
  height: 50%;
  width: 500%;
`

const DrawerContainer = styled(Container)`
  background-color: #015151;
`

const DrawerMenuBtn = styled(TouchableHighlight)`
  width: 100%;
  justify-content: center;
  background-color: ${props =>
    props.active === 1
      ? props.theme.color.button.secondary.color
      : props.theme.color.button.primary.color};
`

const DrawerMenuBtnText = styled(Text)`
  font-size: ${props => (props.large === 1 ? normalize(16) : normalize(12))};
  font-weight: 400;
  color: ${props => props.theme.color.button.text};
`

const LogoDrawerMenu = styled(Image)`
  width: ${props => (props.small === 1 ? normalize(20) : normalize(25))};
  height: ${props => (props.small === 1 ? normalize(20) : normalize(25))};
`

const listMenu = [
  {
    name: 'JOB ASSIGNED',
    routeName: 'TasksJobAssigned',
    logo: require('../assets/images/allJobAssignedIcon.png')
  },
  {
    name: 'JOB PROCESS',
    routeName: 'TasksJobProcess',
    logo: require('../assets/images/allJobProcessIcon.png')
  },
  {
    name: 'COMPLETE',
    routeName: 'TasksCompleted',
    logo: require('../assets/images/allJobCompletedIcon.png')
  },
  {
    name: 'NOTIFICATIONS',
    routeName: '',
    logo: require('../assets/images/menuNotifinationIcon.png')
  },
  {
    name: 'CHANGE LANGUAGE',
    routeName: '',
    logo: require('../assets/images/menuLanguageIcon.png'),
    small: 1
  }
]

class DrawerCustom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: null
    }
  }

  componentDidMount() {
    apiGetProfile().then(res => this.setState({ profile: res.data }))
  }

  render() {
    const { profile } = this.state

    const { navigation } = this.props

    return (
      <DrawerContainer noPdSide={1}>
        {/* <DrawerBgImage
          source={require('../assets/images/bgMenu.png')}
          resizeMode="contain"
        /> */}

        <Space pdleft={20} pdright={20}>
          <Space pdtop={18} pdbottom={18}>
            <Space>
              <DrawerMenuBtnText large={1}>
                {profile ? profile.FullName : ''}
              </DrawerMenuBtnText>
            </Space>

            <Space mgtop={4}>
              <DrawerMenuBtnText>
                {profile ? profile.RoleName : ''}
              </DrawerMenuBtnText>
            </Space>
          </Space>

          <Divider.Horizontal />
        </Space>

        <Space pdtop={8}>
          {listMenu.map((info, index) => {
            return (
              <Space key={index} pdtop={6} pdbottom={6}>
                <DrawerMenuBtn
                  // active={activePage === 'TasksJobAssigned' ? 1 : 0}
                  underlayColor="#D0103A"
                  onPress={() => {
                    navigation.navigate(info.routeName)
                  }}
                >
                  <Space pdtop={4} pdbottom={4}>
                    <Segment.Center>
                      <Row width="58%">
                        <Space mgright={info.small ? 12 : 6}>
                          <LogoDrawerMenu
                            source={info.logo}
                            resizeMode="contain"
                            small={info.small}
                          />
                        </Space>
                        <Segment.CenterMiddle>
                          <DrawerMenuBtnText>{info.name}</DrawerMenuBtnText>
                        </Segment.CenterMiddle>
                      </Row>
                    </Segment.Center>
                  </Space>
                </DrawerMenuBtn>
              </Space>
            )
          })}

          <Space pdtop={6} pdbottom={6}>
            <DrawerMenuBtn
              underlayColor="#D0103A"
              onPress={() => {
                AsyncStorage.removeItem('@token')
                navigation.navigate('Auth')
              }}
            >
              <Space pdtop={4} pdbottom={4}>
                <Segment.Center>
                  <Row width="54%">
                    <Space mgright={8}>
                      <LogoDrawerMenu
                        source={require('../assets/images/menuLogoutIcon.png')}
                        resizeMode="contain"
                        small={1}
                      />
                    </Space>
                    <Segment.CenterMiddle>
                      <DrawerMenuBtnText>LOG OUT</DrawerMenuBtnText>
                    </Segment.CenterMiddle>
                  </Row>
                </Segment.Center>
              </Space>
            </DrawerMenuBtn>
          </Space>
        </Space>
      </DrawerContainer>
    )
  }
}

export { DrawerCustom }
