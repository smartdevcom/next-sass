import BlogLogoElement from '../assets/blog-logo.svg'
import FacebookLogoElement from '../assets/facebook-logo.svg'
import InstagramLogoElement from '../assets/instagram-logo.svg'
import NewsletterLogoElement from '../assets/newsletter-logo.svg'
import PodcastLogoElement from '../assets/podcast-logo.svg'
import UnknownLogoElement from '../assets/unknown-logo.svg'
import YouTubeLogoElement from '../assets/youtube-logo.svg'
import { arrayRemoveDuplicates } from './index'

export const normalizeCampaign = (campaign) => {
  return {
    id: campaign['id'],
    name: campaign['name'],
    stage: campaign['stage'],
    status: campaign['status'],
    endAt: campaign['end_at'],
    startAt: campaign['start_at'],
    overview: campaign['overview'],
    hashtags: campaign['hashtags'],
    tags: campaign['tags'],
    keyMessaging: campaign['key_messaging'],
    dos: campaign['dos'],
    donts: campaign['donts'],
    deliverablesEvents: campaign['deliverables_events'],
    createdAt: campaign['created_at'],
    updatedAt: campaign['updated_at'],
    brief: {
      name: campaign['brief']['name'],
      url: campaign['brief']['url']
    },
    contract: {
      name: campaign['contract']['name'],
      url: campaign['contract']['url']
    },
    brand: {
      logo: campaign['brand']['logo'],
      name: campaign['brand']['name'],
      product: campaign['brand']['product'],
      website: campaign['brand']['website']
    },
    compensation: {
      amount: campaign['compensation']['amount'],
      terms: campaign['compensation']['terms'],
      type: campaign['compensation']['type']
    },
    contact: {
      avatar: campaign['contact']['avatar'],
      email: campaign['contact']['email'],
      name: campaign['contact']['name']
    },
    exclusivity: {
      category: {
        status: campaign['exclusivity']['category']['status'],
        startAt: campaign['exclusivity']['category']['start_at'],
        endAt: campaign['exclusivity']['category']['end_at']
      },
      post: {
        status: campaign['exclusivity']['post']['status'],
        startAt: campaign['exclusivity']['post']['start_at'],
        endAt: campaign['exclusivity']['post']['end_at']
      }
    }
  }
}

export const normalizeCampaignCompensationTypeIcons = (campaign) => {
  const compensationTypeIcons = campaign.compensation.type
    .map((type) => {
      switch (type) {
        case 'paid':
        case 'commission_referral_fee': {
          return 'dollar-sign'
        }
        case 'in_kind_gift':
        case 'in_kind_service':
        case 'in_kind_experience': {
          return 'gift'
        }
        default: {
          return 'question-circle'
        }
      }
    })
    .sort()

  return arrayRemoveDuplicates(compensationTypeIcons)
}

export const normalizeCampaignStatus = (campaign) => {
  switch (campaign.status) {
    case 'new': {
      return 'New Request'
    }
    case 'interested': {
      return 'Interested'
    }
    case 'not_interested': {
      return 'Not Interested'
    }
    case 'negotiation': {
      return 'In Negotiation'
    }
    case 'accepted': {
      return 'Accepted'
    }
    case 'signed': {
      return 'Contract Signed'
    }
    case 'in_progress': {
      return 'In Progress'
    }
    case 'completed': {
      return 'Completed'
    }
    case 'archived': {
      return 'Archived'
    }
    default: {
      return 'Unknown'
    }
  }
}

export const normalizeCampaignStatusColor = (campaign) => {
  let statusColor

  if (
    (campaign.stage === 'active' && campaign.status === 'in_progress') ||
    (campaign.stage === 'negotiation' && campaign.status === 'accepted') ||
    (campaign.stage === 'opportunity' && campaign.status === 'interested')
  ) {
    statusColor = 'green'
  } else if (
    (campaign.stage === 'active' && campaign.status === 'signed') ||
    (campaign.stage === 'opportunity' && campaign.status === 'new') ||
    (campaign.stage === 'negotiation' && campaign.status === 'negotiation')
  ) {
    statusColor = 'orange'
  } else if (
    (campaign.stage === 'active' && campaign.status === 'completed') ||
    (campaign.stage === 'opportunity' && campaign.status === 'not_interested')
  ) {
    statusColor = 'gray'
  }

  return statusColor
}

export const normalizeCampaigBrandWebsiteLink = (campaign) => {
  const website = campaign.brand.website

  return (website.substr(0, 4) !== 'http' ? 'http://' : '') + website
}

export const normalizeCampaigBrandWebsiteName = (campaign) => {
  const website = campaign.brand.website

  if (website.substr(0, 8) === 'https://') {
    return website.substr(8)
  } else if (website.substr(0, 7) === 'http://') {
    return website.substr(7)
  } else {
    return website
  }
}

export const normalizeDeliverable = (deliverable) => {
  return {
    id: deliverable['id'],
    title: deliverable['title'],
    status: deliverable['status'],
    quantity: deliverable['quantity'],
    features: deliverable['features'],
    platform: deliverable['platform'],
    approvalDue: deliverable['approval_due'],
    postDue: deliverable['post_due'],
    campaign: {
      id: deliverable['campaign']['id']
    }
  }
}

export const normalizeEvent = (event) => {
  return {
    id: event['id'],
    name: event['name'],
    status: event['status'],
    start: event['start'],
    end: event['end'],
    type: event['type'],
    campaign: {
      id: event['campaign']['id']
    }
  }
}

export const normalizeDeliverableFeature = (deliverableFeature) => {
  switch (deliverableFeature) {
    case 'swipe_up': {
      return 'Swipe Up'
    }
    case 'tag': {
      return 'Tag'
    }
    case 'mention': {
      return 'Mention'
    }
    case 'location_tag': {
      return 'Location Tag'
    }
    case 'hashtag': {
      return 'Hashtag'
    }
    case 'tracked_link': {
      return 'Tracked Link'
    }
    case 'sponsored_segment': {
      return 'Sponsored Segment'
    }
    default: {
      return 'Unknown'
    }
  }
}

export const normalizeDeliverableLogoElement = (deliverable) => {
  switch (deliverable.platform) {
    case 'blog': {
      return BlogLogoElement
    }
    case 'facebook': {
      return FacebookLogoElement
    }
    case 'instagram': {
      return InstagramLogoElement
    }
    case 'newsletter': {
      return NewsletterLogoElement
    }
    case 'podcast': {
      return PodcastLogoElement
    }
    case 'youtube': {
      return YouTubeLogoElement
    }
    default: {
      return UnknownLogoElement
    }
  }
}

export const normalizeDeliverableStatusColor = (deliverable) => {
  let statusColor

  if (deliverable.status === 'live') {
    statusColor = 'green'
  } else {
    statusColor = 'orange'
  }

  return statusColor
}

export const normalizeEventStatusColor = (event) => {
  let statusColor

  if (event.status === 'completed') {
    statusColor = 'green'
  } else {
    statusColor = 'orange'
  }

  return statusColor
}

export const normalizeUser = (user) => {
  return {
    id: user['id'],
    email: user['email'],
    firstName: user['first_name'],
    lastName: user['last_name'],
    fullName: String(user['first_name'] + ' ' + user['last_name']).trim()
  }
}
