
import React, { useEffect } from 'react'
import { IAppRendererProps } from './'
import styles from './renderer.module.scss'

export const IframeApp: React.FC<IAppRendererProps> = ({ app }) => {

  const iframeRef = React.createRef<HTMLIFrameElement>()

  function getElement(): HTMLIFrameElement {
    const element = iframeRef.current as any
    return element && element.contentDocument
  }

  function handleIframeFocus(event: any) {
    console.log('听说 iframe 被点击了')
  }
  // useEffect(() => {
  //   const iframeElement = getElement()
  //   console.log('这是谁', iframeElement)
  //   iframeElement && iframeElement.addEventListener('click', handleIframeFocus)

  //   return () => {
  //     const iframeElement = getElement()
  //     iframeElement && iframeElement.removeEventListener('click', handleIframeFocus)
  //   }
  // })

  return (
    <iframe
      ref={iframeRef}
      src={app.$.data}
      className={styles.iframe}
      sandbox="allow-scripts allow-same-origin allow-forms"
    />
  );
}
