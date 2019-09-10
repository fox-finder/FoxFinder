
import React from 'react';
import classNames from 'classnames'
import { observer } from 'mobx-react';
import { BasicPlacement } from 'tippy.js'
import './style.scss'

export interface ToolboxProps {
  className?: string
  placement?: BasicPlacement
}

export const Tooltip: React.FC<ToolboxProps> = observer(props => {
  return (
    <div className={classNames("os-tooltip", props.placement || "bottom", props.className)}>
      <div className="tooltip-arrow">
        <svg viewBox="0 0 18 7" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 7s2.021-.015 5.253-4.218C6.584 1.051 7.797.007 9 0c1.203-.007 2.416 1.035 3.761 2.782C16.012 7.005 18 7 18 7H0z"></path>
        </svg>
      </div>
      <div className="tooltip-content">
        {props.children}
      </div>
    </div>
  );
})
