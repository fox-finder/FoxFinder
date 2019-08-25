
import { IFile, PayloadType, FileExtType } from 'types/file'

export const mockDesktopFiles: IFile[] = [
  {
    type: PayloadType.Directory,
    name: '我的收藏',
    path: '/us2r/xxx/xxx/我的收藏',
    mode: 'rw- --- ---',
    size: 1231873,
    create_at: 123123123,
    upodate_at: 123123123
  },
  {
    type: PayloadType.File,
    path: '/usr/xxx/xxx3/xx.doc',
    name: '我的简历',
    ext: FileExtType.DOC,
    mode: 'rw- --- ---',
    size: 234234,
    create_at: 123213123,
    upodate_at: 123123
  },
  {
    type: PayloadType.Directory,
    name: '办公资料',
    path: '/usr/xx3x/xxx/办公资料',
    mode: 'rw- --- ---',
    size: 1231873,
    create_at: 123123123,
    upodate_at: 123123123
  },
  {
    type: PayloadType.File,
    ext: FileExtType.MP4,
    name: 'Linus的视频',
    path: '/usr/2xxx/xxx/Linus的视频.mp4',
    mode: 'rw- --- ---',
    size: 1231873,
    create_at: 123123123,
    upodate_at: 123123123
  },
  {
    type: PayloadType.File,
    ext: FileExtType.XML,
    name: '代码',
    path: '/usr/xx2x/xxx/代码.mp4',
    mode: 'rw- --- ---',
    size: 1231873,
    create_at: 123123123,
    upodate_at: 123123123
  },
  {
    type: PayloadType.File,
    ext: FileExtType.PSD,
    name: 'yige logo',
    path: '/usr/xxx4/xxx/yige logo.psd',
    mode: 'rw- --- ---',
    size: 1231873,
    create_at: 123123123,
    upodate_at: 123123123
  },
  {
    type: PayloadType.File,
    ext: FileExtType.XML,
    name: 'XML 文件',
    path: '/usr/xxx/x5xx/yige logo.psd',
    mode: 'rw- --- ---',
    size: 1231873,
    create_at: 123123123,
    upodate_at: 123123123
  },
]

export const mockFinderFiles: IFile[] = [
  {
    type: PayloadType.Directory,
    name: '我的音乐',
    path: '/usr/6xxx/xxx/music',
    mode: 'rw- --- ---',
    size: 1231873,
    create_at: 123123123,
    upodate_at: 123123123
  },
  {
    type: PayloadType.File,
    path: '/usr/xxx/xx7x/xx.jpg',
    name: '我的照片',
    ext: FileExtType.JPG,
    mode: 'rw- --- ---',
    size: 234234,
    create_at: 123213123,
    upodate_at: 123123
  },
  {
    type: PayloadType.File,
    path: '/usr/x3xx/xxx/xx.js',
    name: '前端代码',
    ext: FileExtType.JS,
    mode: 'rw- --- ---',
    size: 234234,
    create_at: 123213123,
    upodate_at: 123123
  }
]
