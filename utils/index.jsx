import React, { Fragment } from 'react'

export const arrayRemoveDuplicates = (arr) => {
  return arr.filter((item, idx) => {
    return arr.indexOf(item) === idx
  })
}

export const nl2br = (str) => {
  return str.split('\n').map((item, idx) => {
    if (idx === 0) {
      return (
        <Fragment key={idx}>{item}</Fragment>
      )
    } else {
      return (
        <Fragment key={idx}><br />{item}</Fragment>
      )
    }
  })
}

export const splitLineFeedIterate = (arr, delimiter, iteratee) => {
  return arr.map((item, idx) => {
    const element = iteratee(item)

    if (idx === 0) {
      return (
        <Fragment key={idx}>{element}</Fragment>
      )
    } else {
      return (
        <Fragment key={idx}>{delimiter}{element}</Fragment>
      )
    }
  })
}
