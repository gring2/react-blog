import React, { } from 'react'
import styles from './Footer.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

const Footer = ({onLoginClick,logged}) => (
  <footer className={cx('footer')}>
    <Link to="/" className={cx('brand')}>reactblog</Link>
    <div onClick={onLoginClick} className={cx('admin-login')}> Admin
    {logged? 'Logout': 'Login'}
    </div>
  </footer>
)

export default Footer