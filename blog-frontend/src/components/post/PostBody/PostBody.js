import React from 'react'
import styles from './PostBody.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default () => (
  <div className={ cx('post-body')}>
    <div className={ cx('paper') }>
      Content
    </div>
  </div>
)