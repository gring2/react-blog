import React from 'react'
import styles from './Pagination.module.scss'
import classNames from 'classnames/bind'
import Button from 'components/common/Button'

const cx = classNames.bind(styles)

const Pagination = ({page, lastPage, tag}) => {
  const createPagePath = (page) => {
    return tag ? `/tag/${tag}/${page}` : `/page/${page}`
  }

  return (
    <div className={ cx('pagination') }>
      <Button disabled={page === 1} to={createPagePath(page - 1)}>
        previous
      </Button>
      <div className={cx('number')}>
        Page 1
      </div>
      <Button disabled={page === lastPage} to={createPagePath(page + 1)}>
        Next
      </Button>
    </div>
  )
}

export default Pagination