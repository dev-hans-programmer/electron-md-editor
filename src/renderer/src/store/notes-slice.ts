import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NoteInfo } from '@shared/models'
import { notesMock } from './mocks'

interface ExtendedNoteInfo extends NoteInfo {
  content: string
}

export interface NoteState {
  notes: NoteInfo[]
  selectedNoteIndex: number | null
  selectedNote: ExtendedNoteInfo | null
}

const initialState: NoteState = {
  notes: notesMock,
  selectedNoteIndex: null,
  selectedNote: null
}

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setSelectedNoteIndex: (state, action: PayloadAction<number | null>) => {
      state.selectedNoteIndex = action.payload
    },
    createNewNote: (state) => {
      const title = `New note ${state.notes.length}`

      const newNote: NoteInfo = {
        title,
        lastEditTime: Date.now()
      }
      state.selectedNoteIndex = 0
      state.notes.unshift(newNote)
    },
    deleteNote: (state) => {
      if (state.selectedNoteIndex === null) return
      state.notes.splice(state.selectedNoteIndex, 1)
      state.selectedNoteIndex = null
    }
  }
})

export const { setSelectedNoteIndex, createNewNote, deleteNote } = noteSlice.actions

export default noteSlice.reducer
