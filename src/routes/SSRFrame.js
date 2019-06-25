import React, { Component } from 'react'
import { renderToString } from 'react-dom/server'
import { hydrate, render } from 'react-dom'   

const wrapWithMountNode = html => {
  return `<!DOCTYPE html><html><head></head><body><div id="frame">${html}</div></body></html>`.trim()
}

export default class SSRFrame extends Component {
  constructor(props) {
    super(props)
    this.initialMarkup = wrapWithMountNode(
      renderToString(
        React.Children.only(this.props.children)
      )
    )

    this.contentRef = null
    this.setContentRef = node => {
      this.contentRef =
        ((!node || !node.contentWindow) && null) ||
        node.contentWindow.document.getElementById('frame')
    }
  }

  componentDidMount() {
    this.contentRef &&
      hydrate(
        React.Children.only(this.props.children),
        this.contentRef
      )
  }

  componentDidUpdate() {
    this.contentRef &&
      render(
        React.Children.only(this.props.children),
        this.contentRef
      )
  }

  componentWillUnmount() {
    this.contentRef = null
  }

  render() {
    const { children, ...props } = this.props // eslint-disable-line
    return (
      <iframe
        {...props}
        ref={this.setContentRef}
        srcDoc={
          (!this.contentRef && this.initialMarkup) ||
          undefined
        }
      />
    )
  }
}