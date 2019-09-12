const webpack = require('webpack')
const withSass = require('@zeit/next-sass')
const { parsed: localEnv } = require('dotenv').config()

const getEnvVar = (envVar, fallbackValue) => {
  if (localEnv) {
    if (Object.prototype.hasOwnProperty.call(localEnv, envVar)) {
      return localEnv[envVar]
    }
  } else if (Object.prototype.hasOwnProperty.call(process, 'env')) {
    if (Object.prototype.hasOwnProperty.call(process.env, envVar)) {
      return process.env[envVar]
    }
  }

  return fallbackValue
}

const envVars = {
  API: {
    ENDPOINT: getEnvVar('API_ENDPOINT')
  }
}

module.exports = withSass({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: {
              removeViewBox: false
            }
          }
        }
      }]
    })

    config.plugins.push(
      new webpack.EnvironmentPlugin(envVars)
    )

    return config
  }
})
