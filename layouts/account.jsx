import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Link from 'next/link'
import Row from 'react-bootstrap/Row'
import Head from 'next/head'
import classnames from 'classnames'

import LogoElement from '../assets/logo.svg'
import { signout } from '../utils/auth'

import './account.scss'

class AccountLayout extends Component {
  static defaultProps = {
    backLink: '',
    className: '',
    headerVariant: 'violet',
    variant: 'default'
  }

  static propTypes = {
    backLink: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    headerVariant: PropTypes.oneOf(['violet', 'white']),
    title: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['default', 'modal'])
  }

  render() {
    const {
      backLink,
      className: initialClassName,
      children,
      headerVariant,
      title,
      variant,
      ...props
    } = this.props

    const className = classnames(initialClassName, 'account-layout')

    const fontRobotoHref = 'https://fonts.googleapis.com/css' +
      '?family=Roboto:300,400,700&display=swap'

    const headerClassName = classnames('account-layout__header', {
      'account-layout__header--white': headerVariant === 'white',
      'account-layout__header--violet': headerVariant === 'violet'
    })

    return (
      <div className={className} {...props}>
        <Head>
          <link
            href={fontRobotoHref}
            rel="stylesheet"
          />
          <title>{title}</title>
          <script src="https://kit.fontawesome.com/a33dacc79c.js" />
        </Head>

        <div className={headerClassName}>
          <Container>
            {variant === 'modal' ? (
              <Link href={backLink}>
                <a className="account-layout__header-back">
                  <i className="fas fa-arrow-left" />&nbsp;
                  Back
                </a>
              </Link>
            ) : (
              <Row>
                <Col className="d-flex align-items-center" xs={6}>
                  <Link href="/">
                    <a>
                      <LogoElement className="account-layout__header-logo" />
                    </a>
                  </Link>
                </Col>
                <Col
                  className="d-flex align-items-center justify-content-end"
                  xs={6}
                >
                  <Button
                    className="account-layout__header-signout"
                    onClick={signout}
                  >
                    Sign Out
                  </Button>
                </Col>
              </Row>
            )}
          </Container>
        </div>
        {children}
      </div>
    )
  }
}

export default AccountLayout
