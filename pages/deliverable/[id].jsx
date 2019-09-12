import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import classnames from 'classnames'

import '../../styles/styles.scss'

import AccountLayout from '../../layouts/account'
import CampaignHeaderComponent from '../../components/campaign-header'
import NotFoundLayout from '../../layouts/not-found'
import axios from '../../utils/axios'
import { nl2br, splitLineFeedIterate } from '../../utils'
import {
  normalizeCampaign,
  normalizeDeliverable,
  normalizeDeliverableFeature,
  normalizeDeliverableLogoElement,
  normalizeDeliverableStatusColor
} from '../../utils/normalizers'
import { withAuth } from '../../utils/auth'

import './[id].scss'

class DeliverablePage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }

  static async getInitialProps(ctx) {
    const { id } = ctx.query

    return { id }
  }

  state = {
    campaign: null,
    deliverable: null,
    isLoading: true
  }

  async componentDidMount() {
    const { id } = this.props
    const responseDeliverable = await axios().get(`/deliverable/${id}`)
    let deliverable = null

    if (responseDeliverable.status === 200 && responseDeliverable.data.body) {
      deliverable = normalizeDeliverable(responseDeliverable.data.body)
    }

    if (!deliverable) {
      return this.setState({ deliverable, isLoading: false })
    }

    const campaignId = deliverable.campaign.id
    const responseCampaign = await axios().get(`/campaign/${campaignId}`)
    let campaign = null

    if (responseCampaign.status === 200 && responseCampaign.data.body) {
      campaign = normalizeCampaign(responseCampaign.data.body)
    }

    return this.setState({ campaign, deliverable, isLoading: false })
  }

  render() {
    const { campaign, deliverable, isLoading } = this.state

    if (isLoading) {
      return (
        <div>
          Loading...
        </div>
      )
    } else if (campaign === null || deliverable === null) {
      return (
        <NotFoundLayout />
      )
    }

    const statusColor = normalizeDeliverableStatusColor(deliverable)

    const statusElementClassName = classnames(
      'deliverable-page__status',
      `deliverable-page__status--${statusColor}`
    )

    const tagClassName = 'deliverable-page__detail-text--highlighted'
    const LogoElement = normalizeDeliverableLogoElement(deliverable)

    return (
      <AccountLayout
        backLink={`/campaign/${campaign.id}/deliverables`}
        className="deliverable-page"
        title={deliverable.title}
        variant="modal"
      >
        <CampaignHeaderComponent campaign={campaign} />
        <Container>
          <Row noGutters>
            <Col className="deliverable-page__image-container" xs="auto">
              <div className="deliverable-page__image-wrapper">
                <LogoElement className="deliverable-page__image" />
              </div>
            </Col>
            <Col>
              <div className="deliverable-page__body">
                <div className="deliverable-page__title">
                  {deliverable.title}
                </div>
                <p className="deliverable-page__quantity">
                  Quantity: {deliverable.quantity}
                </p>
                <div className={statusElementClassName}>
                  Ready to Post
                </div>
                <p className="deliverable-page__dates">
                  <i className="fas fa-calendar-check" />
                  &nbsp;Approval: {deliverable.approvalDue}
                </p>
                <p className="deliverable-page__dates">
                  <i className="fas fa-calendar-plus" />
                  &nbsp;Post: {deliverable.postDue}
                </p>
              </div>
            </Col>
          </Row>
          <div className="deliverable-page__detail-title">
            Campaign Overview
          </div>
          <p className="deliverable-page__detail-text">
            {nl2br(campaign.overview)}
          </p>
          <div className="deliverable-page__detail-title">
            Exclusivity
          </div>
          <div className="deliverable-page__detail-body">
            <div className="deliverable-page__detail-checkbox">
              <Form.Check
                checked={campaign.exclusivity.post.status}
                custom
                disabled
                id="exclusivity_post"
                label="Post"
                type="checkbox"
              />
              {campaign.exclusivity.post.status && (
                <p className="deliverable-page__detail-checkbox-caption">
                  {campaign.exclusivity.post.startAt}&nbsp;-&nbsp;
                  {campaign.exclusivity.post.endAt}
                </p>
              )}
            </div>
            <div className="deliverable-page__detail-checkbox">
              <Form.Check
                checked={campaign.exclusivity.category.status}
                custom
                disabled
                id="exclusivity_category"
                label="Category"
                type="checkbox"
              />
              {campaign.exclusivity.category.status && (
                <p className="deliverable-page__detail-checkbox-caption">
                  {campaign.exclusivity.category.startAt}&nbsp;-&nbsp;
                  {campaign.exclusivity.category.endAt}
                </p>
              )}
            </div>
          </div>
          <div className="deliverable-page__detail-title">
            Campaign Tags
          </div>
          <div className="deliverable-page__detail-text">
            {splitLineFeedIterate(campaign.tags, (
              <Fragment>,&nbsp;</Fragment>
            ), (item) => {
              return (
                <span className={tagClassName}>{item}</span>
              )
            })}
          </div>
          <div className="deliverable-page__detail-title">
            Campaign Hashtags
          </div>
          <div className="deliverable-page__detail-text">
            {splitLineFeedIterate(campaign.hashtags, (
              <Fragment>,&nbsp;</Fragment>
            ), (item) => {
              return (
                <span className={tagClassName}>{item}</span>
              )
            })}
          </div>
          <div className="deliverable-page__detail-title">
            Features
          </div>
          <div className="deliverable-page__detail-features">
            {deliverable.features.map((item) => {
              return (
                <div className="chip" key={item}>
                  {normalizeDeliverableFeature(item)}
                </div>
              )
            })}
          </div>
          <Button block variant="outline-secondary">
            View Event
          </Button>
        </Container>
      </AccountLayout>
    )
  }
}

export default withAuth(DeliverablePage)
