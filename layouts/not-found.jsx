import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import AccountLayout from './account'

import './not-found.scss'

class NotFoundLayout extends Component {
  static defaultProps = {
    className: '',
    children: null
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
  }

  render() {
    const { className: initialClassName, children, ...props } = this.props
    const className = classnames(initialClassName, 'not-found-layout')

    return (
      <AccountLayout className={className} title="Not Found" {...props}>
        <h1>Not Found</h1>
        {children}
      </AccountLayout>
    )
  }
}

export default NotFoundLayout
