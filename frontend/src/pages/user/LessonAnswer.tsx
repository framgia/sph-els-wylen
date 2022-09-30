import React from 'react'
import { Button, Col, Row, Stack } from 'react-bootstrap'

function LessonAnswer() {
  return (
    <div className="sm-container pt-5">
      <Stack direction="horizontal">
        <h5 className="me-auto">Category Name</h5>
        <h5>3 out of 5</h5>
      </Stack>
      <div className="pt-5">
        <h1>こんにちは</h1>
        <Row xs={1} md={2} className="g-2 pt-5">
          <Col className="d-grid">
            <Button variant="outline-primary">Hello</Button>
          </Col>
          <Col className="d-grid">
            <Button variant="outline-primary">Good morning</Button>
          </Col>
          <Col className="d-grid">
            <Button variant="outline-primary">Goodbye</Button>
          </Col>
          <Col className="d-grid">
            <Button variant="outline-primary">How are you?</Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default LessonAnswer
