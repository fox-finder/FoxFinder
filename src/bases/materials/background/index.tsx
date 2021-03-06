
import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './background.module.scss';

export interface IBackgroundProps extends HTMLAttributes<HTMLElement> {
  tag?: 'span' | 'div' | 'ul' // html 标签
  radius?: string // 圆角
  circle?: boolean // 是否圆形
  blur?: boolean // 是否启用模糊效果
  bgColor?: boolean // 是否启用背景色
  opaque?: boolean // 是否启用不透明效果
  className?: string
  id?: string
  title?: string
  style?: React.CSSProperties
  ref?: React.RefObject<HTMLElement> | ((element: HTMLElement | null) => any)
}

export const Background: React.FC<IBackgroundProps> = React.forwardRef<any, IBackgroundProps>((props, ref) => {

  const { tag, radius, circle, blur, opaque, className, bgColor, style, ...others } = props

  const defaultStyles: React.CSSProperties = {}
  const classNamesList: string[] = []

  if (radius != null) {
    defaultStyles.borderRadius = radius
  }

  if (bgColor) {
    classNamesList.push(styles.color)
  }

  if (circle) {
    classNamesList.push(styles.circle)
  }

  if (blur) {
    classNamesList.push(styles.blur)
  }

  if (opaque) {
    classNamesList.push(styles.opaque)
  }

  const Tag = tag ? tag : 'div'
  const tagProps = {
    id: props.id,
    title: props.title,
    className: classNames(styles.background, ...classNamesList, className),
    style: Object.assign(defaultStyles, style),
  }

  return (
    <Tag {...tagProps} {...others} ref={ref}>
      {props.children}
    </Tag>
  );
})
