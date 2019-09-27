
import React, { AllHTMLAttributes, ImgHTMLAttributes } from 'react'
import classNames from 'classnames'

export interface IconProps extends AllHTMLAttributes<HTMLElement> {
  src?: string
  iconfont?: string
  className?: string
}

export const Icon: React.FC<IconProps> = props => {

  const { src, iconfont, ...others } = props

  if (src) {
    return (
      <img draggable={false} src={src} {...others as ImgHTMLAttributes<HTMLElement>} />
    )
  }

  if (props.iconfont) {
    const { className, ..._others } = others
    return (
      <i
        draggable={false}
        className={classNames(
          "iconfont",
          'icon-' + props.iconfont,
          className
        )}
        {..._others}
      />
    )
  }

  return null
}