import React from 'react'
import styles from './EditorHeader.module.scss'
import classNames from 'classnames/bind'
import Button from 'components/common/Button'

const cx = classNames.bind(styles)

export default ({onGoBack, onSubmit, isEdit}) => {
    return (
      <div className={ cx('editor-header')}>
        <div className={ cx('back')}>
          <Button onClick={ onGoBack } theme="outline">GoBack</Button>
        </div>        
        <div className={ cx('submit') }>
          <Button onClick={ onSubmit } theme="outline"> {isEdit? 'EDIT': 'Submit'}</Button>
        </div>
      </div>
    )
}
