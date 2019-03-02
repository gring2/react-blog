import React, { Component } from 'react'
import styles from './MarkdownRender.module.scss'
import classNames from 'classnames/bind'

import marked from 'marked'
import 'prismjs/themes/prism-okaidia.css'

let Prism = null;
const isBrowser = process.env.APP_ENV === 'browser';
if (isBrowser) {
  Prism = require('prismjs')
  require('prismjs/components/prism-bash.min.js')
  require('prismjs/components/prism-javascript.min.js')
  require('prismjs/components/prism-jsx.min.js')
  require('prismjs/components/prism-css.min.js')

}
// import Prism from 'prismjs'

// import 'prismjs/components/prism-bash.min.js'
// import 'prismjs/components/prism-javascript.min.js'
// import 'prismjs/components/prism-jsx.min.js'
// import 'prismjs/components/prism-css.min.js'

const cx = classNames.bind(styles)

export default class MarkdownRender extends Component {
  state = {
    html: ''
  }

  renderMarkdown = () => {
    const { markdown } = this.props

    if(!markdown) {
      this.setState({html: ''})
      return
    }

    this.setState({
      html: marked(markdown, {
        breaks: true,
        sanitize: true
      })
    })
  }

  constructor(props) {
    super(props)
    const { markdown } = props
    this.state = {
      html: markdown? marked(markdown, {breaks: true, sanitize: true}): ''
    }
  }

  componentDidMount(){
    setTimeout(() => {
      Prism.highlight()

    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.markdown !== this.props.markdown){
      this.renderMarkdown()
    }

    if(prevState.html !== this.state.html) {
      Prism.highlightAll()
    }
  }

  render() {
    const { html } = this.state

    const markup = {
      __html: html
    }
    return (
      <div className={ cx('markdown-render') } dangerouslySetInnerHTML={markup}>
        
      </div>
    )
  }
}
