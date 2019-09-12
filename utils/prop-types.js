import PropTypes from 'prop-types'

export const campaign = PropTypes.exact({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  stage: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  endAt: PropTypes.string.isRequired,
  startAt: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  hashtags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  keyMessaging: PropTypes.string.isRequired,
  dos: PropTypes.string.isRequired,
  donts: PropTypes.string.isRequired,
  deliverablesEvents: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  brief: PropTypes.exact({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired,
  contract: PropTypes.exact({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired,
  brand: PropTypes.exact({
    logo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired
  }).isRequired,
  compensation: PropTypes.exact({
    amount: PropTypes.number.isRequired,
    terms: PropTypes.string.isRequired,
    type: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired
  }).isRequired,
  contact: PropTypes.exact({
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  exclusivity: PropTypes.exact({
    category: PropTypes.exact({
      status: PropTypes.bool.isRequired,
      startAt: PropTypes.string.isRequired,
      endAt: PropTypes.string.isRequired
    }).isRequired,
    post: PropTypes.exact({
      status: PropTypes.bool.isRequired,
      startAt: PropTypes.string.isRequired,
      endAt: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
})

export const deliverable = PropTypes.exact({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  features: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  platform: PropTypes.string.isRequired,
  approvalDue: PropTypes.string.isRequired,
  postDue: PropTypes.string.isRequired,
  campaign: PropTypes.exact({
    id: PropTypes.string.isRequired
  }).isRequired
})

export const user = PropTypes.exact({
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired
})

export const event = PropTypes.exact({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  campaign: PropTypes.exact({
    id: PropTypes.string.isRequired
  }).isRequired
})

export default { campaign, deliverable, user, event }
