import React from 'react'
import styles from './LoginModal.module.scss'
import classNames from 'classnames/bind'
import ModalWrapper from 'components/modal/ModalWrapper'

const cx = classNames.bind(styles)

export default ({visible, password, error, onCancel, onLogin, onChange, onKeyPress}) => (
  <ModalWrapper visible={visible}>
    <div className={ cx('form') }>
      <div onClick={onCancel} className={ cx('close') }>&times;</div>
      <div className={ cx('title') }>Login</div>
      <div className={ cx('description') }>Please enter admin's password</div>
      <input autoFocus type="password" placeholder="input password" value={password} onChange={onChange} onKeyPress={onKeyPress}/>
      {error && <div className={ cx('error')}> Fail to Login </div>}
      <div className={cx('login')} onClick={onLogin}> Login</div>
    </div>
  </ModalWrapper>
)