
import React from 'react';
import classNames from 'classnames';
import styles from './background.module.scss';

export interface IBackgroundProps {
  tag?: 'span' | 'div' | 'ul' // html 标签
  radius?: string // 圆角
  circle?: boolean // 是否圆形
  blur?: boolean // 是否启用模糊效果
  opaque?: boolean // 是否启用不透明效果
  className?: string
  id?: string
  title?: string
  style?: React.CSSProperties
}

export const Background: React.FC<IBackgroundProps> = (props) => {

  const defaultStyles: React.CSSProperties = {}
  const classNamesList: string[] = []

  if (props.radius != null) {
    defaultStyles.borderRadius = props.radius
  }

  if (props.circle) {
    classNamesList.push(styles.circle)
  }

  if (props.blur) {
    classNamesList.push(styles.blur)
  }

  if (props.opaque) {
    classNamesList.push(styles.opaque)
  }

  const Tag = props.tag ? props.tag : 'div'
  const tagProps = {
    id: props.id,
    title: props.title,
    className: classNames(styles.background, ...classNamesList, props.className),
    style: Object.assign(defaultStyles, props.style)
  }

  return (
    <Tag {...tagProps}>
      {props.children}
    </Tag>
  );
}
