

export enum PayloadType {
  File = 'file',
  Directory = 'directory',
}

export enum FileExtType {
  // imahge
  JPG = 'jpg',
  // design
  PSD = 'psd',
  // video
  MP4 = 'mp4',
  // office
  PPT = 'ppt',
  PDF = 'pdf',
  DOC = 'doc',
  SVG = 'svg',
  // languages
  JS = 'js',
  XML = 'xml',
}

export interface IFile {
  type: PayloadType
  name: string // 文件名字
  ext?: FileExtType
  path: string
  mode: string // 权限模式
  size: number
  create_at: number
  upodate_at: number
}

export interface ICompleteFile extends IFile {
  readable: boolean
  writeable: boolean
}


