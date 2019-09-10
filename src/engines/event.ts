
import autobind from 'autobind-decorator'
import { observable, computed, action } from 'mobx';
import { observer } from 'mobx-react';

type IMousedownListener = (event: MouseEvent) => any;

export class Event {

  private mousedownListeners: IMousedownListener[] = []

  @observable isFullscreen: boolean = false;
  @observable isVisible: boolean = true;

  constructor() {
    this.watchMousedown()
    this.watchVisible()
    this.watchFullscreen()
  }
  
  @action.bound addMousedownListener(listener: IMousedownListener) {
    this.mousedownListeners.push(listener)
  }
  
  @action.bound fullscreen() {
    document.documentElement.requestFullscreen()
  }
  
  @action.bound exitFullscreen() {
    document.exitFullscreen();
  }

  @action private watchFullscreen() {
    document.addEventListener('fullscreenchange', event => {
      action(() => {
        this.isFullscreen = document.fullscreen
      })()
    }, false)
  }

  @action private watchVisible() {
    document.addEventListener('visibilitychange', () => {
      action(() => {
        this.isVisible = document.visibilityState === 'visible'
      })()
    }, false)
  }

  @action private watchMousedown() {
    document.addEventListener('mousedown', event => {
      this.mousedownListeners.forEach(listener => listener(event));
    }, false)
  }

  static isHitMousedownTargetElementID(event: MouseEvent, elementId: string) {
    const elements = event.composedPath()
    const ids = elements.map(element => (element as HTMLElement).id)
    return ids.includes(elementId)
  }
}

export const event = new Event()
