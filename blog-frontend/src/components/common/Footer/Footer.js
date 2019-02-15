import React, { } from 'react'
import styles from './Footer.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

const Footer = () => (
  <footer className={ cx('footer') }>
    <Link to="/" className={ cx('brand') }>reactblog</Link>
    <div className={cx('admin-login')}> Admin Login</div>
  </footer>
)

export default Footer