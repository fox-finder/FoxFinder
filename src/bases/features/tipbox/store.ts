
import { observable, action, computed } from 'mobx'
import { event } from 'engines/event'

type TipboxTargetId = string | number | null

class TipBoxStore {

  @observable activeTargetId: TipboxTargetId = null

  @computed get hasVisibleContent(): boolean {
    return !!this.activeTargetId
  }

  @action setActiveTargetId(id: TipboxTargetId) {
    this.activeTargetId = id
  }
}

export const toolboxStore = new TipBoxStore()