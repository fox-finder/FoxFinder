
import { IFile, FileType } from '@fox-finder/base'
import { observable, computed, action } from 'mobx'
 
export function openFile(file: IFile, app?: string): void {
  console.log('用', app, '打开这个文件', file)
}

export function isDirectory(file: IFile): boolean {
  return file.type === FileType.Directory
}

export function isFile(file: IFile): boolean {
  return file.type === FileType.File
}
