
import autobind from 'autobind-decorator'
import { observable, computed, action } from 'mobx'
import { observer } from 'mobx-react'

export enum DndType {
  DesktopApp = 'desktopApp',
  BerthApp = 'berthApp',
  DesktopFile = 'desktopFile',
  DesktopFolder = 'desktopFolder',
  FinderFolder = 'finderFolder',
  FinderFile = 'finderFile',
}

export class Dnd {

  @observable isDragging: boolean = false

  @action.bound updateDragging(isDragging: boolean) {
    this.isDragging = isDragging
  }
}

export const dnd = new Dnd()
