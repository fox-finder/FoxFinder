
import React from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { BasicPlacement } from 'tippy.js'
import Tippy, { TippyProps } from '@tippy.js/react'
import { event } from 'engines/event'
import { toolboxStore } from './store'
import './style.scss'

export enum TipboxContentTiggleType {
  Click = 'click',
  ContextClick = 'contextClick'
}

type CommonElement = React.ReactElement<any>
interface TipboxProps {
  // base
  id: string
  disabled?: boolean
  placement?: BasicPlacement
  children: CommonElement
  // tool title
  title?: string
  // tool content
  content?: CommonElement
  contentInteractive?: boolean
  contentTiggle?: TipboxContentTiggleType
}

@observer export class Tipbox extends React.Component<TipboxProps> {

  constructor(props: TipboxProps) {
    super(props)
    // event.addMousedownListener(event => {
      /**
       * 1. other element -> hidden self
       * 2. self element -> this.props.contentInteractive ? true : false
      */
      // console.log('判断元素啊', event)
      // if (this.props.contentInteractive) {
        // console.log('判断元素啊', event)
      // } else {
        // this.setContentActiveState(false)
      // }
    // })
  }

  @observable private isHover: boolean = false

  @computed get isContentActive(): boolean {
    return toolboxStore.activeTargetId === this.props.id
  }

  @computed get canTooltipVisible(): boolean {
    return !toolboxStore.hasVisibleContent
  }

  @computed get isEnabledTooltipBox(): boolean {
    return !!this.props.title
  }

  @computed get isEnabledContentBox(): boolean {
    return !!this.props.content
  }

  @computed get isOnlyTooltipBox(): boolean {
    return this.isEnabledTooltipBox && !this.isEnabledContentBox
  }

  @action private setHoverState(hover: boolean): void {
    this.isHover = hover
  }

  @action private setContentActiveState(active: boolean): void {
    toolboxStore.setActiveTargetId(
      active ? this.props.id : null
    )
  }

  @computed get children(): CommonElement {

    /**
     * 1. tooltip -> hover -> not events
     * 2. content -> manual -> onContextMenuCapture | click
     * 3. both -> manual -> onContextMenuCapture | click + onMouseEnter + onMouseLeave
    */
    const eventRegisters = {}

    if (this.isEnabledContentBox) {

      const eventHandle = (event: Event) => {
        event.preventDefault()
        this.setContentActiveState(!this.isContentActive)
      }

      Object.assign(
        eventRegisters,
        !this.props.contentTiggle || this.props.contentTiggle === TipboxContentTiggleType.ContextClick
          ? { onContextMenuCapture: eventHandle }
          : { onClickCapture: eventHandle }
      )

      if (this.isEnabledTooltipBox) {
        Object.assign(eventRegisters, {
          onMouseEnter: (event: Event) => {
            event.preventDefault();
            this.setHoverState(true)
          },
          onMouseLeave: (event: Event) => {
            event.preventDefault();
            this.setHoverState(false)
          }
        })
      }
    }

    return React.cloneElement(
      React.Children.only(this.props.children),
      eventRegisters
    )
  }

  render() {

    if (!this.props.children) {
      return null
    }

    if (!this.props.title && !this.props.content) {
      return this.props.children
    }

    const contentElement = !this.props.content ? '' : React.cloneElement(
      this.props.content as CommonElement,
      { 'data-toolbox-id': this.props.id }
    )

    const tooltipElement = (
      <div className="tooltip">{this.props.title}</div>
    )

    const tippyProps: TippyProps = {
      arrow: true,
      flip: false,
      inertia: true,
      animateFill: false,
      hideOnClick: false,
      className: "os-tipbox",
      ignoreAttributes: true,
      distance: 15,
      placement: this.props.placement || "bottom",
      animation: "fade",
      arrowType: "round",
      duration: [200, 200],
      zIndex: 201,
    } as TippyProps

    /**
     * 1. only tooltip -> tooltipElement
     * 2. contextContent -> contentElement
     * 3. both -> contentElement | tooltipElement
    */
    if (this.isOnlyTooltipBox) {
      tippyProps.trigger = 'mouseenter'
      tippyProps.interactive = false
      tippyProps.content = tooltipElement

      if (!this.canTooltipVisible) {
        tippyProps.visible = false
      }
    }

    if (this.isEnabledContentBox) {
      tippyProps.trigger = 'manual'
      tippyProps.interactive = true
      tippyProps.visible = this.isContentActive

      if (this.isContentActive) {
        tippyProps.content = contentElement
      }
      else if (this.isEnabledTooltipBox) {
        tippyProps.content = tooltipElement
        tippyProps.visible = this.isHover && this.canTooltipVisible
      }
    }

    if (this.props.disabled) {
      tippyProps.visible = false
    }

    return (
      <Tippy {...tippyProps}>{this.children}</Tippy>
    );
  }
}
