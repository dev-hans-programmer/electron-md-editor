import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NoteInfo } from '@shared/models'
import { notesMock } from './mocks'

export interface ExtendedNoteInfo extends NoteInfo {
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
    setNotes: (state, action: PayloadAction<NoteInfo[]>) => {
      state.notes = action.payload
    },
    setSelectedNoteIndex: (state, action: PayloadAction<number | null>) => {
      state.selectedNoteIndex = action.payload
    },
    createNewNote: (state, action: PayloadAction<string>) => {
      const newNote: NoteInfo = {
        title: action.payload,
        lastEditTime: Date.now()
      }
      state.selectedNoteIndex = 0
      state.notes.unshift(newNote)
    },
    deleteNote: (state, action: PayloadAction<boolean>) => {
      if (!action.payload) return
      if (state.selectedNoteIndex === null) return
      state.notes.splice(state.selectedNoteIndex, 1)
      state.selectedNoteIndex = null
    },
    updateNote: (state) => {
      if (!state.selectedNoteIndex) return
      const selectedNote = state.notes[state.selectedNoteIndex]

      state.notes = state.notes.map((note) =>
        note.title === selectedNote.title ? { ...note, lastEditTime: Date.now() } : note
      )
    }
  }
})

export const { setSelectedNoteIndex, createNewNote, deleteNote, setNotes, updateNote } =
  noteSlice.actions

export default noteSlice.reducer
