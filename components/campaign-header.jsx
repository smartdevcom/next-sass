import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import classnames from 'classnames'

import propTypes from '../utils/prop-types'
import {
  normalizeCampaignCompensationTypeIcons,
  normalizeCampaignStatus,
  normalizeCampaignStatusColor
} from '../utils/normalizers'

import './campaign-header.scss'

class CampaignHeaderComponent extends Component {
  static defaultProps = {
    className: ''
  };

  static propTypes = {
    campaign: propTypes.campaign.isRequired,
    className: PropTypes.string
  };

  render() {
    const { campaign, className: initialClassName, ...props } = this.props
    const className = classnames(initialClassName, 'campaign-header-component')
    const isOpportunity = campaign.stage === 'opportunity'
    const statusColor = normalizeCampaignStatusColor(campaign)

    const statusClassName = classnames(
      'campaign-header-component__status',
      `campaign-header-component__status--${statusColor}`
    )

    return (
      <div className={className} {...props}>
        <Container>
          <div className="campaign-header-component__image-wrapper">
            <span
              className="campaign-header-component__image"
              style={{ backgroundImage: `url('${campaign.brand.logo}')` }}
            />
          </div>
        </Container>
        <div className={statusClassName}>
          {normalizeCampaignStatus(campaign)}
        </div>
        <Container>
          <div className="campaign-header-component__name">{campaign.name}</div>
          <p className="campaign-header-component__last-update">
            Last update: {campaign.updatedAt}
          </p>
          <p className="campaign-header-component__compensation-type">
            {normalizeCampaignCompensationTypeIcons(campaign).map((icon) => {
              const iconClassName = classnames('fas', 'fa-' + icon)

              return (
                <Fragment key={icon}>
                  <i className={iconClassName} />
                  &nbsp;
                </Fragment>
              )
            })}
          </p>
          {!isOpportunity && campaign.compensation.amount && (
            <p className="campaign-header-component__compensation-amount">
              Paid amount: ${campaign.compensation.amount}
            </p>
          )}
          {!isOpportunity && (
            <p className="campaign-header-component__dates">
              <i className="fas fa-calendar" />
              &nbsp;
              {campaign.startAt} - {campaign.endAt}
            </p>
          )}
        </Container>
      </div>
    )
  }
}

export default CampaignHeaderComponent
