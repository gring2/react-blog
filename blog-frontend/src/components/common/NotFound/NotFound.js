import React from 'react'
import styles from './NotFound.module.scss'
import classNames from 'classnames/bind'
import Button from 'components/common/Button'

const cx = classNames.bind(styles)

export default ({onGoBack}) => (
  <div className={ cx('not-found') }>
    <h2>Page Not Found</h2>
    <Button onClick={onGoBack} theme="outline">GoBack</Button>
  </div>
)