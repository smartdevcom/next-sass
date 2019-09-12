import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Head from 'next/head'
import qs from 'querystring'

import '../../styles/styles.scss'

import axios from '../../utils/axios'
import { signin, withoutAuth } from '../../utils/auth'

import './signin.scss'

class AuthSigninPage extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChangeEmail = (event) => {
    return this.setState({ email: event.target.value })
  }

  handleChangePassword = (event) => {
    return this.setState({ password: event.target.value })
  }

  handleClearPasswords = () => {
    return this.setState({ password: '' })
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { email, password } = this.state
      const data = { email, password }
      const response = await axios().post('/auth/signin', qs.stringify(data))

      if (response.status === 200) {
        return signin(response.data.body)
      }
    } catch (e) {
    }

    return this.handleClearPasswords()
  }

  render() {
    const { email, password } = this.state
    const isFormValid = email.length >= 5 && password.length >= 6

    return (
      <Container className="signin-page">
        <Head>
          <title>Login</title>
        </Head>

        <Form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <Form.Group controlId="signin_email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              autoComplete="email"
              onChange={this.handleChangeEmail}
              placeholder="Enter email"
              type="email"
              value={email}
            />
          </Form.Group>
          <Form.Group controlId="signin_password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              autoComplete="current-password"
              onChange={this.handleChangePassword}
              placeholder="Enter password"
              type="password"
              value={password}
            />
          </Form.Group>
          <Button disabled={!isFormValid} type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </Container>
    )
  }
}

export default withoutAuth(AuthSigninPage)
