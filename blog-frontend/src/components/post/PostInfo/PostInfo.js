import React from 'react'
import styles from './PostInfo.module.scss'
import classNames from 'classnames/bind'

import { Link } from 'react-router-dom'
import moment from 'moment'

const cx = classNames.bind(styles)

export default ({publishedDate, title, tags}) => (
  <div className={ cx('post-info') }>
    <div className={ cx('info') }>
      <h1>{title}</h1>
      <div className={ cx('tags') }>
        {
          tags && tags.map( tag => <Link key={tag} to={`/tag/${tag}`}>#{tag}</Link> )
        }
      </div>
      <div className={ cx('date') }>{publishedDate && moment(publishedDate).format('ll')}</div>
    </div>
  </div>
)