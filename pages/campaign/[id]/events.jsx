import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'

import '../../../styles/styles.scss'

import AccountLayout from '../../../layouts/account'
import CampaignHeaderComponent from '../../../components/campaign-header'
import EventCardComponent from '../../../components/event-card'
import NotFoundLayout from '../../../layouts/not-found'
import axios from '../../../utils/axios'
import {
  normalizeCampaign,
  normalizeEvent
} from '../../../utils/normalizers'
import { withAuth } from '../../../utils/auth'

import './deliverables.scss'

class CampaignEventsPage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }

  static async getInitialProps(ctx) {
    const { id } = ctx.query

    return { id }
  }

  state = {
    campaign: null,
    events: [],
    isLoading: true
  }

  async componentDidMount() {
    const { id } = this.props

    const loadCampaign = async () => {
      const response = await axios().get(`/campaign/${id}`)
      let campaign = null

      if (response.status === 200 && response.data.body) {
        campaign = normalizeCampaign(response.data.body)
      }

      return this.setState({ campaign })
    }

    const loadDeliverables = async () => {
      const response = await axios().get(`/campaign/${id}/events`)
      const events = []

      if (response.status === 200 && response.data.body) {
        for (const event of response.data.body) {
          events.push(
            normalizeEvent(event)
          )
        }
      }
      return this.setState({ events })
    }

    await Promise.all([
      loadCampaign(),
      loadDeliverables()
    ])

    return this.setState({ isLoading: false })
  }

  render() {
    const { campaign, events, isLoading } = this.state
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

    return (
      <AccountLayout
        backLink={`/campaign/${campaign.id}`}
        className="campaign-deliverables-page"
        title="Deliverables"
        variant="modal"
      >
        <CampaignHeaderComponent campaign={campaign} />
        <Container>
          <div className="campaign-deliverables-page__headline">
            Deliverables
          </div>
          <div className="campaign-deliverables-page__deliverables">
            {events.map((event) => {
              return (<EventCardComponent
                className="campaign-deliverables-page__deliverable"
                event={event}
                key={event.id}
              />
              )
            })}
          </div>
        </Container>
      </AccountLayout>
    )
  }
}

export default withAuth(CampaignEventsPage)
