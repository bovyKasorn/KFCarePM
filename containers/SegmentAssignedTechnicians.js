import React, { Component } from 'react'
import { Platform } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import { Font, Space, Row, Bullet, Button, Segment } from '../components'
import { SelectTechnicians, SelectStatus, ModalLoading } from '../containers'
import { apiGetTechnicians } from '../api/getTechnicians'
import { apiAssignedJob } from '../api/AssignedJob'

class SegmentAssignedTechnicians extends Component {
  constructor(props) {
    super(props)
    this.state = {
      technicians: [],
      technicianSelected: [{ TechnicianID: null, TechnicianName: null }],
      statusSelected: Platform.OS === 'android' ? 1 : null,
      loading: false
    }
  }

  componentDidMount() {
    apiGetTechnicians().then(res => {
      this.setState(
        {
          technicians: res.data
        },
        () =>
          Platform.OS === 'android'
            ? this.setState({
                technicianSelected: [
                  {
                    TechnicianID: this.state.technicians[0].TechnicianID,
                    TechnicianName: this.state.technicians[0].TechnicianName
                  }
                ]
              })
            : null
      )
    })
  }

  handleLoading = loading => {
    this.setState({ loading })
  }

  handleSelectTechnicians = (technician, order) => {
    const { technicianSelected, technicians } = this.state

    technicianSelected[order].TechnicianID = technician

    const indexTech = technicians.findIndex(
      tech => tech.TechnicianID === technician
    )

    technicianSelected[order].TechnicianName =
      technicians[indexTech].TechnicianName

    // technicians.splice(indexTech,1)

    this.setState({ technicianSelected, technicians })
  }

  addMoreTechnicians = () => {
    const { technicianSelected } = this.state

    technicianSelected.push({
      TechnicianID:
        Platform.OS === 'android'
          ? this.state.technicians[0].TechnicianID
          : null,
      TechnicianName:
        Platform.OS === 'android'
          ? this.state.technicians[0].TechnicianName
          : null
    })

    this.setState({ technicianSelected })
  }

  deleteTechnicians = order => {
    const { technicianSelected, technicians } = this.state

    // technicians.unshift(technicianSelected[order])

    technicianSelected.splice(order, 1)

    this.setState({ technicianSelected, technicians })
  }

  handleSelectStatus = status => {
    this.setState({ statusSelected: status })
  }

  submitAssigned = async () => {
    const { technicianSelected } = this.state
    const { taskId, navigation } = this.props

    this.handleLoading(true)

    for (i = technicianSelected.length; i > 0; i--) {
      if (technicianSelected[i - 1].TechnicianID === null) {
        technicianSelected.splice(i - 1, 1)
      }
    }

    if (technicianSelected.length > 0) {
      const response = await apiAssignedJob(taskId, technicianSelected)

      if (response.data === '') {
        this.handleLoading(false)

        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'TasksNewJob' })]
        })

        navigation.dispatch(resetAction)
      }

      return
    }

    technicianSelected.push({
      TechnicianID:
        Platform.OS === 'android'
          ? this.state.technicians[0].TechnicianID
          : null,
      TechnicianName:
        Platform.OS === 'android'
          ? this.state.technicians[0].TechnicianName
          : null
    })

    this.setState({ technicianSelected }, () => this.handleLoading(false))

    return
  }

  render() {
    const {
      technicians,
      technicianSelected,
      statusSelected,
      loading
    } = this.state

    return (
      <Space pdleft={15} pdright={15} pdtop={14}>
        <Space>
          <Row>
            <Bullet small={1} />
            <Font.H2 bold={1}>Technician Name</Font.H2>
          </Row>
          <SelectTechnicians
            technicians={technicians}
            technicianSelected={technicianSelected}
            handleSelectTechnicians={this.handleSelectTechnicians}
            addMoreTechnicians={this.addMoreTechnicians}
            deleteTechnicians={this.deleteTechnicians}
          />
        </Space>

        <Space pdtop={8}>
          <Row>
            <Bullet small={1} />
            <Font.H2 bold={1}>Status</Font.H2>
          </Row>

          <SelectStatus
            statusSelected={statusSelected}
            handleSelectStatus={this.handleSelectStatus}
          />
        </Space>

        <Space pdtop={8}>
          <Row>
            <Bullet small={1} />
            <Font.H2 bold={1}>Comment</Font.H2>
          </Row>

          <Space>
            <Font.H2>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Font.H2>
          </Space>
        </Space>

        <Space pdtop={8}>
          <Row>
            <Bullet small={1} />
            <Font.H2 bold={1}>Technician Comment</Font.H2>
          </Row>

          <Space>
            <Font.H2>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Font.H2>
          </Space>
        </Space>

        <Space pdtop={16}>
          <Segment.Center>
            <Button onPress={() => this.submitAssigned()}>Submit</Button>
          </Segment.Center>
        </Space>

        <ModalLoading
          loading={loading}
          // onDismiss={() =>
          //   resApi
          //     ? Alert.alert(
          //         '',
          //         resApi.data.error_description || 'Error',
          //         [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          //         { cancelable: false }
          //       )
          //     : {}
          // }
        />
      </Space>
    )
  }
}

export { SegmentAssignedTechnicians }
