
import moment from 'moment'
import React from 'react'
import classNames from 'classnames'
import Calendar from 'react-calendar'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { option } from 'engines/option'
import { event } from 'engines/event'
import { Tooltip, Title } from 'bases/features/tooltip'
import { Icon } from 'bases/materials/icon'
import { isDisabledTooltip, calendarOperating } from '.'
import styles from './header.module.scss'

const now = observable.box(moment())
const Time: React.FC = observer(() => (
  <span>{now.get().format('YYYY/MM/DD HH:mm:ss')}</span>
))

setInterval(() => now.set(moment()), 1000)

@observer export class Tray extends React.Component<any> {

  private toggleFullscreen(): void {
    event.isFullscreen
      ? event.exitFullscreen()
      : event.fullscreen()
  }

  render() {
    return (
      <div className={styles.tray}>
        <Tooltip
          disabled={isDisabledTooltip.get() && !calendarOperating.get()}
          className={classNames(
            styles.time,
            styles.item,
            styles.action
          )}
          hover={{ content: <Title>日历</Title> }}
          click={{
            interactive: true,
            hideOnClick: false,
            onOpen: () => calendarOperating.set(true),
            onClose: () => calendarOperating.set(false),
            content: (
              <Calendar
                className={styles.calendar}
                value={moment().toDate()}
                nextLabel={<Icon iconfont="right" className={styles.label} />}
                prevLabel={<Icon iconfont="left" className={styles.label} />}
                prev2Label={<Icon iconfont="doubleleft" className={styles.label} />}
                next2Label={<Icon iconfont="doubleright" className={styles.label} />}
              />
            )
          }}
        >
          <span className={styles.content}>
            <Time />
          </span>
        </Tooltip>
        <Tooltip
          className={classNames(
            styles.theme,
            styles.item,
            styles.action
          )}
          onClick={() => option.updateThemeMode(!option.personalize.darkTheme)}
          hover={{ content: <Title>{`切换到${option.personalize.darkTheme ? '浅色' : '深色'}模式`}</Title> }}
          disabled={isDisabledTooltip.get()}
        >
          <Icon
            className={styles.content}
            iconfont={
              option.personalize.darkTheme
                ? "moon"
                : "sun"
            }
          />
        </Tooltip>
        <Tooltip
          hover={{ content: <Title>退出系统</Title> }}
          disabled={isDisabledTooltip.get()}
          className={classNames(
            styles.off,
            styles.item,
            styles.action
          )}
        >
          <Icon
            iconfont="off"
            className={styles.content}
          />
        </Tooltip>
        <Tooltip
          className={classNames(
            styles.screen,
            styles.item,
            styles.action
          )}
          onClick={this.toggleFullscreen}
          disabled={isDisabledTooltip.get()}
          hover={{ content: <Title>{`${event.isFullscreen ? '退出' : '进入'}全屏`}</Title> }}
        >
          <Icon
            className={styles.content}
            iconfont={
              event.isFullscreen
                ? "not-fullscreen"
                : "fullscreen"
            }
          />
        </Tooltip>
      </div>
    )
  }
}
