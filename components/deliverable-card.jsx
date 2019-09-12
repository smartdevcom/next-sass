import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Link from 'next/link'
import Row from 'react-bootstrap/Row'
import classnames from 'classnames'

import propTypes from '../utils/prop-types'
import {
  normalizeDeliverableLogoElement,
  normalizeDeliverableStatusColor
} from '../utils/normalizers'

import './deliverable-card.scss'

class DeliverableCardComponent extends Component {
  static defaultProps = {
    className: ''
  }

  static propTypes = {
    className: PropTypes.string,
    deliverable: propTypes.deliverable.isRequired,
    variant: PropTypes.string
  }

  render() {
    const { className: initialClassName, deliverable, ...props } = this.props

    const statusColor = normalizeDeliverableStatusColor(deliverable)

    const className = classnames(
      initialClassName,
      'deliverable-card-component',
      `deliverable-card-component--status-${statusColor}`
    )

    const LogoElement = normalizeDeliverableLogoElement(deliverable)

    return (
      <Link href="/deliverable/[id]" as={`/deliverable/${deliverable.id}`}>
        <a>
          <Card className={className} {...props}>
            <Row noGutters>
              <Col
                className="deliverable-card-component__image-container"
                xs="auto"
              >
                <div className="deliverable-card-component__image-wrapper">
                  <div className="deliverable-card-component__quantity">
                    {deliverable.quantity}
                  </div>
                  <LogoElement className="deliverable-card-component__image" />
                </div>
              </Col>
              <Col>
                <Card.Body className="deliverable-card-component__body">
                  <Card.Title className="deliverable-card-component__title">
                    {deliverable.title}
                  </Card.Title>
                  <Card.Text className="deliverable-card-component__status">
                    Ready to Post
                  </Card.Text>
                  <Card.Text className="deliverable-card-component__dates">
                    <i className="fas fa-calendar-check" />&nbsp;
                    {deliverable.approvalDue}
                  </Card.Text>
                  <Card.Text className="deliverable-card-component__dates">
                    <i className="fas fa-calendar-plus" />&nbsp;
                    {deliverable.postDue}
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

export default DeliverableCardComponent
