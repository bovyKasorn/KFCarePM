import React, { Component } from 'react'
import { KeyboardAvoidAndScroll, JobCard } from '../containers'
import { Container } from '../components'

const mockData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

class Home extends Component {
  render() {
    return (
      <KeyboardAvoidAndScroll>
        <Container noPdSide={1}>
          {mockData.map((value, index) => {
            return <JobCard key={index} />
          })}
        </Container>
      </KeyboardAvoidAndScroll>
    )
  }
}

export { Home }
