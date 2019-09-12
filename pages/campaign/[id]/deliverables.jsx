import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'

import '../../../styles/styles.scss'

import AccountLayout from '../../../layouts/account'
import CampaignHeaderComponent from '../../../components/campaign-header'
import DeliverableCardComponent from '../../../components/deliverable-card'
import NotFoundLayout from '../../../layouts/not-found'
import axios from '../../../utils/axios'
import {
  normalizeCampaign,
  normalizeDeliverable
} from '../../../utils/normalizers'
import { withAuth } from '../../../utils/auth'

import './deliverables.scss'

class CampaignDeliverablesPage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }

  static async getInitialProps(ctx) {
    const { id } = ctx.query

    return { id }
  }

  state = {
    campaign: null,
    deliverables: [],
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
      const response = await axios().get(`/campaign/${id}/deliverables`)
      const deliverables = []

      if (response.status === 200 && response.data.body) {
        for (const deliverable of response.data.body) {
          deliverables.push(
            normalizeDeliverable(deliverable)
          )
        }
      }

      return this.setState({ deliverables })
    }

    await Promise.all([
      loadCampaign(),
      loadDeliverables()
    ])

    return this.setState({ isLoading: false })
  }

  render() {
    const { campaign, deliverables, isLoading } = this.state

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
            {deliverables.map((deliverable) => {
              return (<DeliverableCardComponent
                className="campaign-deliverables-page__deliverable"
                deliverable={deliverable}
                key={deliverable.id}
              />
              )
            })}
          </div>
        </Container>
      </AccountLayout>
    )
  }
}

export default withAuth(CampaignDeliverablesPage)
