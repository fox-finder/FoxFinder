
import React from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component'
import { IAppRendererProps } from '.';
import styles from './renderer.module.scss';

const injectCSS = `
  body { margin: 0 }
`

export class ExtApp extends React.Component<IAppRendererProps> {

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { app } = this.props
    return (
      <Frame className={styles.iframe} sandbox="allow-scripts allow-same-origin allow-forms">
        <FrameContextConsumer>
          {({ document, window }: any) => {
            window.close = app.close
            window.activate = app.activate
            window.hiddenWindow = app.hiddenWindow
            window.maximizedWindow = app.maximizedWindow
            // window.osConfirm = 
            // window.dialog = 
            const code = `
              <style>${injectCSS}</style>
              ${app.$.data}
            `
            setTimeout(() => {
              document.write(code)
              document.addEventListener('mousedown', app.activate)
            })
          }}
        </FrameContextConsumer>
      </Frame>
    )
  }
}
