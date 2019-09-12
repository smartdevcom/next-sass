import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Link from 'next/link'
import Row from 'react-bootstrap/Row'
import classnames from 'classnames'

import propTypes from '../utils/prop-types'
import {
  normalizeCampaignCompensationTypeIcons,
  normalizeCampaignStatus,
  normalizeCampaignStatusColor
} from '../utils/normalizers'

import './campaign-card.scss'

class CampaignCardComponent extends Component {
  static defaultProps = {
    className: '',
    variant: 'opportunity'
  };

  static propTypes = {
    campaign: propTypes.campaign.isRequired,
    className: PropTypes.string,
    variant: PropTypes.string
  };

  render() {
    const { campaign, className: initialClassName, variant, ...props } =
    this.props

    const statusColor = normalizeCampaignStatusColor(campaign)

    const className = classnames(
      initialClassName,
      'campaign-card-component',
      `campaign-card-component--status-${statusColor}`
    )

    const compensationTypeIcons =
    normalizeCampaignCompensationTypeIcons(campaign)

    const logoBackgroundImage = `url('${campaign.brand.logo}')`

    return (
      <Link href="/campaign/[id]" as={`/campaign/${campaign.id}`}>
        <a>
          <Card className={className} {...props}>
            <Row noGutters>
              <Col
                className="campaign-card-component__image-container"
                xs="auto">
                <div className="campaign-card-component__image-wrapper">
                  <span
                    className="campaign-card-component__image"
                    style={{ backgroundImage: logoBackgroundImage }}
                  />
                </div>
              </Col>
              <Col>
                <Card.Body className="campaign-card-component__body">
                  <Card.Title className="campaign-card-component__name">
                    {campaign.name}
                  </Card.Title>
                  <Card.Text className="campaign-card-component__status">
                    {normalizeCampaignStatus(campaign)}
                  </Card.Text>
                  <Card.Text
                    className="campaign-card-component__compensation-type">
                    {compensationTypeIcons.map((icon) => {
                      const iconClassName = classnames('fas', 'fa-' + icon)

                      return (
                        <Fragment key={icon}>
                          <i className={iconClassName} />
                          &nbsp;
                        </Fragment>
                      )
                    })}
                    {campaign.compensation.amount &&
                    <span>${campaign.compensation.amount}</span>}
                  </Card.Text>
                  {campaign.stage === 'active' && (
                    <Card.Text className="campaign-card-component__dates">
                      <i className="fas fa-calendar" />
                      &nbsp;
                      {campaign.startAt} - {campaign.endAt}
                    </Card.Text>
                  )}
                  <Card.Text className="campaign-card-component__last-update">
                    Last update: {campaign.updatedAt}
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

export default CampaignCardComponent
