import React from 'react'
import Tweet from './Tweet.jsx'
import { Container, Col, Row, Card } from 'react-bootstrap'

export default function Feed({ data }){
  // sort by created_at date in stocktwits system
  const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const feedStyling = {paddingLeft: '0px', paddingBottom: '10px', paddingTop: '10px', listStyleType: 'none', margin: '0px'}
  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }} s={{span:12}}>
          <ul style={feedStyling}>

            {sortedData.map( (content) => <Tweet content={content} />)}
          </ul>
        </Col>
      </Row>
    </Container>
  )
}
