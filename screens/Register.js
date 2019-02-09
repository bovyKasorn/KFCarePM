import React from 'react'
import { Text, View } from 'react-native'
import {
  Bullet,
  Button,
  Container,
  Divider,
  FontAuth,
  Input,
  Row,
  Segment,
  Space
} from '../components'
import { KeyboardAvoidAndScroll } from '../containers'
import { normalize } from '../utilities'

class Register extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: 'Create an Account'
    }
  }

  render() {
    return (
      <KeyboardAvoidAndScroll>
        <Container>
          <View>
            <Row>
              <Bullet source={require('../assets/images/bulletHeadXL.png')} />
              <FontAuth.H2>Register Infomation</FontAuth.H2>
            </Row>
            <Space
              pdleft={normalize(23)}
              pdright={normalize(23)}
              pdbottom={normalize(8)}
            >
              <Input placeholder="Full Name" />
              <Input placeholder="Nickname" />
              <Input placeholder="Email" autoCapitalize="none" />
              <Input placeholder="Password" secureTextEntry />
            </Space>
          </View>

          <View>
            <Row>
              <Bullet source={require('../assets/images/bulletHeadXL.png')} />
              <FontAuth.H2>Personal Infomation</FontAuth.H2>
            </Row>
            <Space
              pdleft={normalize(23)}
              pdright={normalize(23)}
              pdbottom={normalize(14)}
            >
              <Input placeholder="Employer ID" />
              <Input placeholder="Mobile Phone" />
              <Input placeholder="Section" />
            </Space>
          </View>

          <Divider />

          <Space
            pdleft={normalize(20)}
            pdright={normalize(20)}
            pdtop={normalize(14)}
          >
            <Text style={{ fontSize: normalize(10.5) }}>
              Your personal information will be kept confidential and used only
              to provide your benefit coverage and recover your password.
            </Text>
          </Space>

          <Space pdtop={normalize(20)}>
            <Segment.Center>
              <Button onPress={() => console.log('123')}>Sign Up</Button>
            </Segment.Center>
          </Space>
        </Container>
      </KeyboardAvoidAndScroll>
    )
  }
}

export { Register }
