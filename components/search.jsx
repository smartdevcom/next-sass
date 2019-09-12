import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import classnames from 'classnames'

import './search.scss'

class SearchComponent extends Component {
  static defaultProps = {
    className: ''
  }

  static propTypes = {
    className: PropTypes.string
  }

  render() {
    const { className: initialClassName, ...props } = this.props
    const className = classnames(initialClassName, 'search-component')

    return (
      <div className={className} {...props}>
        <div className="search-component__wrapper">
          <Form.Control
            className="search-component__input"
            placeholder="What would you like to find?"
            type="text"
          />
          <i className="search-component__icon fas fa-search" />
        </div>
      </div>
    )
  }
}

export default SearchComponent
