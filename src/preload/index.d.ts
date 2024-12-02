// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ElectronAPI } from '@electron-toolkit/preload'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'

interface Context {
  locale: string
  getNotes: GetNotes
  readNote: ReadNote
  writeNote: WriteNote
  createNote: CreateNote
  deleteNote: DeleteNote
}

declare global {
  interface Window {
    context: Context
  }
}
