import React, { } from 'react'
import styles from './Header.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import Button from 'components/common/Button'

const cx = classNames.bind(styles)

const Header = ({postId, onRemove, logged}) => (
  <header className={cx('header')}>
    <div className={ cx('header-content') }>
      <div className={ cx('brand') }>
        <Link to="/">reactblog</Link>
      </div>
      { logged && 
      <div className={ cx('right') }>
      {
        postId && [
          <Button key="edit" theme="outline" to={`/editor?id=${postId}`}>Edit</Button>,
          <Button key="remove" theme="outline" onClick={onRemove}>Remove</Button>
        ]
      }
        <Button theme="outline" to="/editor"> new POst</Button>
      </div>
      }
    </div>
  </header>
)

export default Header