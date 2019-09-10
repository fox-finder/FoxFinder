
import moment from 'moment';
import React from 'react';
import classNames from 'classnames';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { MouseKeyType } from 'bases/layouts/menu/store';
import { option } from 'engines/option'
import { event } from 'engines/event'
import { MenuRegister } from 'bases/layouts/menu/Register';
import { Tipbox, TipboxContentTiggleType } from '../tipbox'
import styles from './header.module.scss';

@observer export class Tray extends React.Component<any> {

  @observable private nowTime = this.getNowTime()

  private getNowTime(): string {
    return moment().format('YYYY/MM/DD HH:mm:ss')
  }

  private toggleFullscreen(): void {
    event.isFullscreen
      ? event.exitFullscreen()
      : event.fullscreen()
  }

  @action private intervalTime(): void {
    setInterval(() => {
      this.nowTime = this.getNowTime()
    }, 1000)
  }

  componentDidMount() {
    this.intervalTime()
  }

  render() {
    return (
      <div className={styles.tray}>
        <Tipbox
          title="日历"
          content={(
            <span>日历组件</span>
          )}
          id="header-time"
          contentTiggle={TipboxContentTiggleType.Click}
        >
          <div className={classNames(styles.time, styles.item)}>
            <span>{this.nowTime}</span>
          </div>
        </Tipbox>
        <Tipbox title="退出系统" id="header-logout">
          <div className={classNames(styles.off, styles.item, styles.action)}>
            <i className="iconfont icon-off" />
          </div>
        </Tipbox>
        <Tipbox
          id="header-fullscreen"
          title={`${event.isFullscreen ? '退出' : '进入'}全屏`}
        >
          <div
            onClick={this.toggleFullscreen}
            className={classNames(styles.screen, styles.item, styles.action)}
          >
            <i
              className={classNames(
                "iconfont",
                event.isFullscreen
                  ? "icon-not-fullscreen"
                  : "icon-fullscreen"
              )}
            />
          </div>
        </Tipbox>
      </div>
    );
  }
}
