
import React, { HTMLAttributes, useState } from 'react'
import { observable, observe, computed, action, reaction } from 'mobx'
import { observer, Observer } from 'mobx-react'
import classNames from 'classnames';
import './style.scss'

const CLASSNAME_PREFIX = 'tooltip'
const CONTAINER_CLASSNAME = CLASSNAME_PREFIX + '-container'

export function isHitMousedownEventFromTooltipContainer(event: MouseEvent) {
  return event
    .composedPath()
    .some(element => {
      const classnames = (element as HTMLElement).classList
      return classnames && classnames.value.includes(CONTAINER_CLASSNAME)
    })
}

enum ActiveContentType {
  Hover = 'hover',
  Click = 'click',
  Context = 'context'
}

type ActiveContentTypeValue = ActiveContentType | null

export interface TooltipPayloadBase {
  content?: React.ReactNode
  interactive?: boolean
}

export interface TooltipPayloadClick extends TooltipPayloadBase {
  hideOnClick?: boolean
  onOpen?(): void // open
  onClose?(): void // close
}

export interface TooltipProps<T extends HTMLElement = any> extends HTMLAttributes<HTMLElement> {
  // contents
  [ActiveContentType.Hover]?: TooltipPayloadBase
  [ActiveContentType.Click]?: TooltipPayloadClick
  [ActiveContentType.Context]?: TooltipPayloadClick
  // options
  tabIndex?: number
  position?: "top" | "bottom" | "left" | "right"
  disabled?: boolean
  // react normali props
  tag?: keyof React.ReactHTML // html 标签
  className?: string
  style?: React.CSSProperties
  ref?: React.RefObject<T> | ((element: T | null) => any)
}

export const Title: React.FC = props => {
  return (
    <div className={`${CLASSNAME_PREFIX}-title`}>
      {props.children}
    </div>
  )
}

@observer export class Tooltip extends React.Component<TooltipProps> {

  @observable activeContentType: ActiveContentTypeValue = null
  @observable activeContentElementType: ActiveContentTypeValue = null
  @observable isUpdateElementTypeOntransitionEnd: boolean = false
  @observable isLastBlurFromContent: boolean = false

  @observable.ref element: React.RefObject<any> = React.createRef<any>()

  constructor(props: TooltipProps) {
    super(props)
    this.watchTypeChange()
    this.resetActiveContentToHover()
  }

  handleTypeChange(newType: ActiveContentTypeValue, oldType: ActiveContentTypeValue) {
    const isToMouseDownType = newType === ActiveContentType.Click || newType === ActiveContentType.Context
    const isFromMouseDownType = oldType === ActiveContentType.Click || oldType === ActiveContentType.Context
    const originOptions = this.getContentOptionsByType(oldType)
    const targetOptions = this.getContentOptionsByType(newType)
    if (isFromMouseDownType) {
      originOptions && originOptions.onClose && originOptions.onClose()
    }
    if (isToMouseDownType) {
      targetOptions && targetOptions.onOpen && targetOptions.onOpen()
    }
  }

  watchTypeChange() {
    observe(
      computed(() => this.activeContentType),
      ({ newValue, oldValue }) => {
        this.handleTypeChange(newValue, oldValue as ActiveContentTypeValue)
      }
    )
  }

  getContentOptionsByType(type: ActiveContentTypeValue): TooltipPayloadClick | null {
    const optionsMap = {
      [ActiveContentType.Hover]: this.props.hover,
      [ActiveContentType.Click]: this.props.click,
      [ActiveContentType.Context]: this.props.context,
    }
    return type && optionsMap[type] || null
  }

  @action updateElementTypeAsyncState(async: boolean) {
    this.isUpdateElementTypeOntransitionEnd = async
  }

  @action updateActiveContentElementType(type: ActiveContentTypeValue) {
    this.activeContentElementType = type
  }

  @action updateActiveContentType(type: ActiveContentTypeValue) {
    this.activeContentType = type
    if (!this.isUpdateElementTypeOntransitionEnd) {
      this.updateActiveContentElementType(type)
    }
  }

  @action handleHiddenTransitionEnd() {
    if (this.isUpdateElementTypeOntransitionEnd) {
      this.updateActiveContentElementType(this.activeContentType)
      this.updateElementTypeAsyncState(false)
    }
  }

  @action resetActiveContentToHover() {
    this.updateActiveContentType(
      this.hoverContent
        ? ActiveContentType.Hover
        : null
    )
  }

  @action toggleActiveContentWithType(type: ActiveContentType) {
    if (this.activeContentType === type) {
      this.resetActiveContentToHover()
    } else {
      this.updateActiveContentType(type)
    }
  }

  @action updateLastBlurOriginState(value: boolean) {
    return this.isLastBlurFromContent = value
  }

  @computed get activeContentOptions() {
    return this.getContentOptionsByType(
      this.activeContentType
    )
  }

  @computed get isInteractiveActiveContent(): boolean {
    const target = this.activeContentOptions
    return !!(target && target.interactive)
  }

  @computed get isHiddenOnClickActiveContent(): boolean {
    const target = this.activeContentOptions as TooltipPayloadClick
    return !!(target && target.hideOnClick)
  }

  @computed get hoverContent(): React.ReactNode {
    return this.props.hover && this.props.hover.content
  }

  @computed get clickContent(): React.ReactNode {
    return this.props.click && this.props.click.content
  }

  @computed get contextContent(): React.ReactNode {
    return this.props.context && this.props.context.content
  }

  @computed get hasValidContent(): boolean {
    return !!(
      this.hoverContent ||
      this.clickContent ||
      this.contextContent
    )
  }

  @action.bound handleBlur(event: any) {
    if (!this.isLastBlurFromContent) {
      this.updateElementTypeAsyncState(true)
      this.resetActiveContentToHover()
      this.props.onBlur && this.props.onBlur(event)
    } else {
      this.element.current.focus()
    }
    this.updateLastBlurOriginState(false)
  }

  @action.bound handleMouseDown(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (isHitMousedownEventFromTooltipContainer(event.nativeEvent) && !this.isHiddenOnClickActiveContent) {
      this.updateLastBlurOriginState(true)
    }
    this.props.onMouseDown && this.props.onMouseDown(event)
  }

  @action.bound handleClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (isHitMousedownEventFromTooltipContainer(event.nativeEvent)) {
      this.isHiddenOnClickActiveContent && this.element.current.blur()
    } else {
      this.props.onClickCapture && this.props.onClickCapture(event)
      // if has click content -> toggle; else close
      if (this.clickContent) {
        this.toggleActiveContentWithType(ActiveContentType.Click)
      } else {
        this.resetActiveContentToHover()
      }
    }
  }

  @action.bound handleContextMenu(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (isHitMousedownEventFromTooltipContainer(event.nativeEvent)) {
      this.isHiddenOnClickActiveContent && this.element.current.blur()
    } else {
      event.preventDefault()
      this.props.onContextMenuCapture && this.props.onContextMenuCapture(event)
      // if has context content -> toggle; else close
      if (this.contextContent) {
        this.toggleActiveContentWithType(ActiveContentType.Context)
      } else {
        this.resetActiveContentToHover()
      }
    }
  }

  render() {

    const {
      children, tag,
      hover, click, context,
      position, disabled, tabIndex, className,
      ...otherProps
    } = this.props

    const wrapperClassNames = [
      CLASSNAME_PREFIX,
      className,
    ]

    const containerClassNames = [
      position || 'bottom',
      disabled && 'disabled',
      this.isInteractiveActiveContent && "interactive"
    ]

    const Tag = tag || 'div'
    const tagProps = {
      ...otherProps,
      ref: this.element,
      tabIndex: tabIndex || 0,
      className: classNames(wrapperClassNames),
    }

    if (!disabled && this.hasValidContent) {
      const newClassnames = [
        ...wrapperClassNames,
        this.activeContentElementType === ActiveContentType.Hover && "hover",
        [
          ActiveContentType.Click,
          ActiveContentType.Context
        ].includes(this.activeContentType as ActiveContentType) && "visible"
      ]

      Object.assign(tagProps, {
        className: classNames(newClassnames),
        onBlur: this.handleBlur,
        onMouseDownCapture: this.handleMouseDown,
        onClickCapture: this.handleClick,
        onContextMenuCapture: this.handleContextMenu,
      })
    }

    const contentMap = {
      [ActiveContentType.Hover]: this.hoverContent,
      [ActiveContentType.Click]: this.clickContent,
      [ActiveContentType.Context]: this.contextContent,
    }
    const content = this.activeContentElementType && contentMap[this.activeContentElementType] 

    return (
      <Tag {...tagProps}>
        {children}
        {this.hasValidContent && content && (
          <div
            className={classNames(CONTAINER_CLASSNAME, containerClassNames)}
            onTransitionEnd={node => {
              const element = node.currentTarget
              const styles = element && window.getComputedStyle(element)
              const hidden = styles && styles.visibility === 'hidden'
              hidden && this.handleHiddenTransitionEnd()
            }}
          >
            <div className={`${CLASSNAME_PREFIX}-arrow`}>
              <svg viewBox="0 0 18 7" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 7s2.021-.015 5.253-4.218C6.584 1.051 7.797.007 9 0c1.203-.007 2.416 1.035 3.761 2.782C16.012 7.005 18 7 18 7H0z"></path>
              </svg>
            </div>
              <div className={`${CLASSNAME_PREFIX}-content`}>
                {content}
              </div>
          </div>
        )}
      </Tag>
    )
  }
}
