import { useAppSelector } from '@renderer/store/redux-store'

function useMarkdownEditor() {
  const { notes, selectedNoteIndex } = useAppSelector((state) => state.notes)

  const selectedNote =
    selectedNoteIndex || selectedNoteIndex === 0
      ? { ...notes[selectedNoteIndex], content: `Hello World ${selectedNoteIndex}` }
      : null

  return {
    selectedNote
  }
}

export default useMarkdownEditor
