
import { IFile, FileType } from '@fox-finder/base'
import { isDirectory } from 'engines/file'

export const IMAGE_FILE_EXTS = {
  JPG: 'jpg',
  PNG: 'png',
}

export const OFFICE_FILE_EXTS = {
  PPT: 'ppt',
  PDF: 'pdf',
  DOC: 'doc',
  SVG: 'svg'
}

export const VIDEO_FILE_EXTS = {
  MP4: 'mp4',
  MKV: 'mkv',
  MPG: 'mpg',
}

export const DESIGN_FILE_EXTS = {
  PSD: 'psd',
  AI: 'ai',
}

export const PROGRAM_FILE_EXTS = {
  JS: 'js',
  XML: 'xml',
  JSON: 'json',
}

export const FILE_EXTS = {
  ...IMAGE_FILE_EXTS,
  ...DESIGN_FILE_EXTS,
  ...VIDEO_FILE_EXTS,
  ...OFFICE_FILE_EXTS,
  ...PROGRAM_FILE_EXTS,
}

export const BASE_ICON_PATH = '/images/files/'
export const FLODER_ICON_NAME = 'folder.svg'
export const FLODER_OPENED_ICON_NAME = 'folder-opened.svg'
export const DAFAULT_FILE_ICON_NAME = 'file.svg'
export const FILE_ICON_NAMES = {
  [FILE_EXTS.PSD]: 'psd.svg',
  [FILE_EXTS.JPG]: 'jpg.svg',
  [FILE_EXTS.PNG]: 'png.svg',
  [FILE_EXTS.MP4]: 'mpg.svg',
  [FILE_EXTS.PPT]: 'ppt.svg',
  [FILE_EXTS.DOC]: 'word.svg',
  [FILE_EXTS.SVG]: 'svg.svg',
  [FILE_EXTS.PDF]: 'pdf.svg',
  [FILE_EXTS.XML]: 'xml.svg',
  [FILE_EXTS.JS]: 'js.svg',
  [FILE_EXTS.JSON]: 'json.svg',
}

export function getIconPathByName(name: string): string {
  return BASE_ICON_PATH + name
}

export function getIconPathByFile(file: IFile): string {
  return getIconPathByName(
    isDirectory(file)
      ? FLODER_ICON_NAME
      : file.ext && FILE_ICON_NAMES[file.ext] || DAFAULT_FILE_ICON_NAME
  )
}
