
import { IFile, FileType } from '@fox-finder/base'
import autobind from 'autobind-decorator'
import { observable, computed, action } from 'mobx'
import { observer } from 'mobx-react'
import { get } from 'services/fetch'

export class FinderItem {

  @observable data: IFile[] = []

  @action.bound getFiles() {
    get('file/list', { path: '/Users/surmon/Projects/Blog/nodepress' }).then(data => {
      console.log('data', data)
      if (data && data.data) {
        this.data = data.data as IFile[]
      }
    })
  }
}
