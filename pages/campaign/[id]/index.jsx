import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Link from 'next/link'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import classnames from 'classnames'

import '../../../styles/styles.scss'

import AccountLayout from '../../../layouts/account'
import CampaignHeaderComponent from '../../../components/campaign-header'
import NotFoundLayout from '../../../layouts/not-found'
import axios from '../../../utils/axios'
import { nl2br, splitLineFeedIterate } from '../../../utils'
import {
  normalizeCampaign,
  normalizeCampaigBrandWebsiteLink,
  normalizeCampaigBrandWebsiteName
} from '../../../utils/normalizers'
import { withAuth } from '../../../utils/auth'

import './index.scss'

class CampaignPage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }

  static async getInitialProps(ctx) {
    const { id } = ctx.query

    return { id }
  }

  state = {
    campaign: null,
    isLoading: true
  }

  async componentDidMount() {
    const { id } = this.props
    const response = await axios().get(`/campaign/${id}`)
    let campaign = null

    if (response.status === 200 && response.data.body) {
      campaign = normalizeCampaign(response.data.body)
    }

    return this.setState({ campaign, isLoading: false })
  }

  render() {
    const { campaign, isLoading } = this.state

    if (isLoading) {
      return (
        <div>
          Loading...
        </div>
      )
    } else if (campaign === null) {
      return (
        <NotFoundLayout />
      )
    }

    const isActive = campaign.stage === 'active'
    const isNegotiation = campaign.stage === 'negotiation'
    const isOpportunity = campaign.stage === 'opportunity'
    const tagClassName = 'campaign-page__detail-text--highlighted'

    const tabsClassName = classnames('campaign-page__tabs', {
      'campaign-page__tabs--negotiation': isNegotiation
    })

    return (
      <AccountLayout
        backLink="/"
        className="campaign-page"
        title={campaign.name}
        variant="modal"
      >
        <CampaignHeaderComponent campaign={campaign} />
        <Container>
          <div className="campaign-page__brand-details">
            <p className="campaign-page__brand-subtitle">
              Brand
            </p>
            <div className="campaign-page__brand-name">
              {campaign.brand.name}
            </div>
            <p className="campaign-page__brand-product">
              Product: {campaign.brand.product}
            </p>
            <div className="campaign-page__brand-website">
              <a
                href={normalizeCampaigBrandWebsiteLink(campaign)}
                target="_blank"
              >
                {normalizeCampaigBrandWebsiteName(campaign)}
              </a>
            </div>
          </div>
          <div className="campaign-page__detail-title">
            Campaign Overview
          </div>
          <p className="campaign-page__detail-text">
            {nl2br(campaign.overview)}
          </p>
          {!isOpportunity && (
            <Tabs
              className={tabsClassName}
              defaultActiveKey="details"
              id="detail"
            >
              <Tab eventKey="details" title="Details">
                <div className="campaign-page__detail-title">
                  Deliverables & Events
                </div>
                <p className="campaign-page__detail-text">
                  {nl2br(campaign.deliverablesEvents)}
                </p>
                {isActive && (
                  <Fragment>
                    <div className="campaign-page__detail-title">
                      Campaign Tags
                    </div>
                    <div className="campaign-page__detail-text">
                      {splitLineFeedIterate(campaign.tags, (
                        <Fragment>,&nbsp;</Fragment>
                      ), (item) => {
                        return (
                          <span className={tagClassName}>{item}</span>
                        )
                      })}
                    </div>
                    <div className="campaign-page__detail-title">
                      Campaign Hashtags
                    </div>
                    <div className="campaign-page__detail-text">
                      {splitLineFeedIterate(campaign.hashtags, (
                        <Fragment>,&nbsp;</Fragment>
                      ), (item) => {
                        return (
                          <span className={tagClassName}>{item}</span>
                        )
                      })}
                    </div>
                  </Fragment>
                )}
                <div className="campaign-page__detail-title">
                  Exclusivity
                </div>
                <div className="campaign-page__detail-body">
                  <div className="campaign-page__detail-checkbox">
                    <Form.Check
                      checked={campaign.exclusivity.post.status}
                      custom
                      disabled
                      id="exclusivity_post"
                      label="Post"
                      type="checkbox"
                    />
                    {campaign.exclusivity.post.status && (
                      <p className="campaign-page__detail-checkbox-caption">
                        {campaign.exclusivity.post.startAt}&nbsp;-&nbsp;
                        {campaign.exclusivity.post.endAt}
                      </p>
                    )}
                  </div>
                  <div className="campaign-page__detail-checkbox">
                    <Form.Check
                      checked={campaign.exclusivity.category.status}
                      custom
                      disabled
                      id="exclusivity_category"
                      label="Category"
                      type="checkbox"
                    />
                    {campaign.exclusivity.category.status && (
                      <p className="campaign-page__detail-checkbox-caption">
                        {campaign.exclusivity.category.startAt}&nbsp;-&nbsp;
                        {campaign.exclusivity.category.endAt}
                      </p>
                    )}
                  </div>
                </div>
                <div className="campaign-page__detail-title">
                  Campaign Brief
                </div>
                <div className="campaign-page__detail-body">
                  <a
                    className="campaign-page__detail-download"
                    download
                    href={campaign.brief.url}
                    target="_blank"
                  >
                    <i className="fas fa-file-pdf" />
                    {campaign.brief.name}
                  </a>
                </div>
                <div className="campaign-page__detail-title">
                  Campaign Contract
                </div>
                <div className="campaign-page__detail-body">
                  <a
                    className="campaign-page__detail-download"
                    download
                    href={campaign.contract.url}
                    target="_blank"
                  >
                    <i className="fas fa-file-pdf" />
                    {campaign.contract.name}
                  </a>
                </div>
                {isActive && (
                  <Fragment>
                    <div className="campaign-page__detail-title">
                      Compensation Terms
                    </div>
                    <p className="campaign-page__detail-text">
                      {nl2br(campaign.compensation.terms)}
                    </p>
                  </Fragment>
                )}
              </Tab>
              <Tab eventKey="guidelines" title="Guidelines">
                <div className="campaign-page__detail-title">
                  Key Messaging
                </div>
                <p className="campaign-page__detail-text">
                  {nl2br(campaign.keyMessaging)}
                </p>
                <div className="campaign-page__detail-title">
                  Do’s
                </div>
                <p className="campaign-page__detail-text">
                  {nl2br(campaign.dos)}
                </p>
                <div className="campaign-page__detail-title">
                  Dont’s
                </div>
                <p className="campaign-page__detail-text">
                  {nl2br(campaign.donts)}
                </p>
              </Tab>
            </Tabs>
          )}
          {isActive && (
            <hr className="campaign-page__detail-divider" />
          )}
          <div className="campaign-page__detail-title">
            Campaign Contact
          </div>
          <a href={`mailto:` + campaign.contact.email}>
            <Card className="campaign-page__contact-card">
              <Row noGutters>
                <Col
                  className="campaign-page__contact-image-container"
                  xs="auto"
                >
                  <div className="campaign-page__contact-image-wrapper">
                    <span className="campaign-page__contact-image" />
                  </div>
                </Col>
                <Col>
                  <Card.Body className="campaign-page__contact-body">
                    <Card.Title className="campaign-page__contact-name">
                      {campaign.contact.name}
                    </Card.Title>
                    <Card.Text className="campaign-page__contact-email">
                      {campaign.contact.email}
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </a>
          <Button block variant="outline-secondary">
            View Emails & Attachments
          </Button>
          {!isOpportunity && (
            <Fragment>
              {/* <Button block variant="outline-secondary">
                View Events
              </Button> */}
              <Link
                href="/campaign/[id]/events"
                as={`/campaign/${campaign.id}/events`}
              >
                <a className="btn btn-block btn-outline-secondary">
                  View Events
                </a>
              </Link>
              <Link
                href="/campaign/[id]/deliverables"
                as={`/campaign/${campaign.id}/deliverables`}
              >
                <a className="btn btn-block btn-outline-secondary">
                  View Deliverables
                </a>
              </Link>
            </Fragment>
          )}
        </Container>
      </AccountLayout>
    )
  }
}

export default withAuth(CampaignPage)
