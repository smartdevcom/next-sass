import React, { Component } from 'react'
import Router from 'next/router'
import nookies from 'nookies'

import axios, { delAuthToken, getAuthToken, setAuthToken } from './axios'
import { normalizeUser } from './normalizers'

const auth = async (ctx) => {
  try {
    if (!getAuthToken(ctx)) {
      return null
    }

    const response = await axios(ctx).get('/auth/token')

    if (response.status === 200) {
      const user = response.data.body

      return normalizeUser(user)
    }
  } catch (e) {
  }

  nookies.destroy(ctx, 'a_t')

  return null
}

const getDisplayName = (Component) => {
  return Component.displayName || Component.name || 'Component'
}

export const withAuth = (WrappedComponent) => {
  return class WithAuth extends Component {
    static displayName = `withAuth(${getDisplayName(WrappedComponent)})`

    static async getInitialProps(ctx) {
      const user = await auth(ctx)

      if (user === null) {
        const redirectPageUrl = '/auth/signin'

        if (ctx.req && ctx.res) {
          ctx.res.writeHead(302, { Location: redirectPageUrl })
          ctx.res.end()
        } else {
          Router.push(redirectPageUrl)
        }

        return {}
      }

      let componentProps = {}

      if (WrappedComponent.getInitialProps) {
        componentProps = await WrappedComponent.getInitialProps(ctx)
      }

      return { ...componentProps, user }
    }

    handleSignout = (event) => {
      if (event.key === 'signout') {
        Router.push('/auth/signin')
        window.localStorage.removeItem('signout')
      }
    }

    componentDidMount() {
      window.addEventListener('storage', this.handleSignout)
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.handleSignout)
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
}

export const withoutAuth = (WrappedComponent) => {
  return class WithoutAuth extends Component {
    static displayName = `withoutAuth(${getDisplayName(WrappedComponent)})`

    static async getInitialProps(ctx) {
      const user = await auth(ctx)

      if (user !== null) {
        const redirectPageUrl = '/'

        if (ctx.req && ctx.res) {
          ctx.res.writeHead(302, { Location: redirectPageUrl })
          ctx.res.end()
        } else {
          Router.push(redirectPageUrl)
        }

        return {}
      }

      let componentProps = {}

      if (WrappedComponent.getInitialProps) {
        componentProps = await WrappedComponent.getInitialProps(ctx)
      }

      return { ...componentProps, user }
    }

    handleSignin = (event) => {
      if (event.key === 'signin') {
        Router.push('/')
        window.localStorage.removeItem('signin')
      }
    }

    componentDidMount() {
      window.addEventListener('storage', this.handleSignin)
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.handleSignin)
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
}

export const signin = (token) => {
  setAuthToken(null, token)

  Router.push('/')
  window.localStorage.setItem('signin', Date.now().toString())
}

export const signout = () => {
  delAuthToken()

  Router.push('/auth/signin')
  window.localStorage.setItem('signout', Date.now().toString())
}
