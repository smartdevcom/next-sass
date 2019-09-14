import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import '../styles/styles.scss'

import AccountLayout from '../layouts/account'
import CampaignCardComponent from '../components/campaign-card'
import SearchComponent from '../components/search'
import axios from '../utils/axios'
import propTypes from '../utils/prop-types'
import { normalizeCampaign } from '../utils/normalizers'
import { withAuth } from '../utils/auth'

import './index.scss'

//root index page

class IndexPage extends Component {
  static propTypes = {
    user: propTypes.user.isRequired
  };

  state = {
    isLoading: true,
    activeCampaigns: [],
    negotiationCampaigns: [],
    opportunityCampaigns: []
  };

  async componentDidMount() {
    const campaignStages = ['active', 'negotiation', 'opportunity']

    await Promise.all(
      campaignStages.map(async (campaignStage) => {
        const response = await axios().get(`/campaigns/${campaignStage}`)
        const campaigns = []

        if (response.status === 200) {
          for (const campaign of response.data.body) {
            campaigns.push(normalizeCampaign(campaign))
          }
        }

        return this.setState({ [`${campaignStage}Campaigns`]: campaigns })
      })
    )

    return this.setState({ isLoading: false })
  }

  render() {
    const { user } = this.props

    const {
      isLoading,
      activeCampaigns,
      negotiationCampaigns,
      opportunityCampaigns
    } = this.state

    if (isLoading) {
      return <div>Loading...</div>
    }

    return (
      <AccountLayout className="index-page" headerVariant="white" title="Home">
        <Container>
          <div className="index-page__hero">
            <span className="index-page__hero-image" />
            <span className="index-page__hero-overlay" />
          </div>

          <div className="index-page__greeting">
            Hello, <b>{user.firstName}!</b>
          </div>

          <SearchComponent className="index-page__search-component" />

          <div className="index-page__campaigns">
            <div className="index-page__campaigns-headline">Your Campaigns</div>
            <Tabs defaultActiveKey="opportunity" id="campaign">
              <Tab eventKey="opportunity" title="Opportunity">
                {opportunityCampaigns.map((campaign) => {
                  return (
                    <CampaignCardComponent
                      campaign={campaign}
                      className="index-page__campaign"
                      key={campaign.id}
                      variant="opportunity"
                    />
                  )
                })}
              </Tab>
              <Tab eventKey="negotiation" title="Negotiation">
                {negotiationCampaigns.map((campaign) => {
                  return (
                    <CampaignCardComponent
                      campaign={campaign}
                      className="index-page__campaign"
                      key={campaign.id}
                      variant="negotiation"
                    />
                  )
                })}
              </Tab>
              <Tab eventKey="active" title="Active">
                {activeCampaigns.map((campaign) => {
                  return (
                    <CampaignCardComponent
                      campaign={campaign}
                      className="index-page__campaign"
                      key={campaign.id}
                      variant="active"
                    />
                  )
                })}
              </Tab>
            </Tabs>
          </div>
        </Container>
      </AccountLayout>
    )
  }
}

export default withAuth(IndexPage)
