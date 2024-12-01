import { NoteInfo } from '@shared/models'
import { atom } from 'jotai'
import { notesMock } from './mocks'

export const notesAtom = atom<NoteInfo[]>(notesMock)

export const selectedNoteIndexAtom = atom<number | null>(null)

export const selectedNoteAtom = atom((get) => {
  const notes = get(notesAtom)

  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (!selectedNoteIndex) return null

  const selectedNote = notes[selectedNoteIndex]

  return {
    ...selectedNote,
    content: 'Hello World fucker ### MCP ' + selectedNoteIndex
  }
})

export const createNewNoteAtom = atom(null, (get, set) => {
  set(selectedNoteIndexAtom, 0)
  const notes = get(notesAtom)

  const title = `Note ${notes.length + 1}`

  const newNote: NoteInfo = {
    title,
    lastEditTime: Date.now()
  }

  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== title)])
})

export const deleteNoteAtom = atom(null, (get, set) => {
  const selectedNote = get(selectedNoteAtom)
  const notes = get(notesAtom)

  if (!selectedNote) return

  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title)
  )

  set(selectedNoteIndexAtom, null)
})
