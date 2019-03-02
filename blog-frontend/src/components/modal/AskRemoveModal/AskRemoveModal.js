import React from 'react'
import styles from './AskRemoveModal.module.scss'
import classNames from 'classnames/bind'
import ModalWrapper from 'components/modal/ModalWrapper'
import Button from 'components/common/Button'

const cx = classNames.bind(styles)

const AskRemoveModal = ({visible, onCancel, onConfirm}) => (
  <ModalWrapper visible={visible}>
    <div className={ cx('question') }>
      <div className={ cx('title') }>Remove Post</div>
      <div className={ cx('description') }>Do you want to remove this post?</div>      
    </div>
    <div className={ cx('options') }>
      <Button theme="gray" onClick={onCancel}>cancel</Button>
      <Button onClick={onConfirm}>Remove</Button>
    </div>
  </ModalWrapper>
)

export default AskRemoveModal