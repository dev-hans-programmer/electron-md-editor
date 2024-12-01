import { selectedNoteAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'

function useMarkdownEditor() {
  const selectedNote = useAtomValue(selectedNoteAtom)

  return {
    selectedNote
  }
}

export default useMarkdownEditor
