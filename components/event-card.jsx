import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Link from 'next/link'
import Row from 'react-bootstrap/Row'
import classnames from 'classnames'

import propTypes from '../utils/prop-types'
import {
  normalizeEventStatusColor
} from '../utils/normalizers'

import './event-card.scss'

class EventCardComponent extends Component {
  static defaultProps = {
    className: ''
  }

  static propTypes = {
    className: PropTypes.string,
    key: PropTypes.string,
    event: propTypes.event.isRequired,
    variant: PropTypes.string
  }

  render() {
    const { className: initialClassName, event, ...props } = this.props

    const statusColor = normalizeEventStatusColor(event)

    const className = classnames(
      initialClassName,
      'event-card-component',
      `event-card-component--status-${statusColor}`
    )

    return (
      <Link href="/event/[id]" as={`/event/${event.id}`}>
        <a>
          <Card className={className} {...props}>
            <Row noGutters>
              {/* <Col
                className="deliverable-card-component__image-container"
                xs="auto"
              >
                <div className="deliverable-card-component__image-wrapper">
                  <div className="deliverable-card-component__quantity">
                    {event.quantity}
                  </div>
                  <LogoElement className="deliverable-card-component__image" />
                </div>
              </Col> */}
              <Col>
                <Card.Body className="event-card-component__body">
                  <Card.Title className="event-card-component__title">
                    {event.name}
                  </Card.Title>
                  <Card.Text className="event-card-component__status">
                    {event.status}
                  </Card.Text>
                  <Card.Text className="event-card-component__dates">
                    <i className="fas fa-calendar-check" />&nbsp;
                    {event.start}
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </a>
      </Link>
    )
  }
}

export default EventCardComponent
