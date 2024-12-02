import { setSelectedNoteIndex } from '@renderer/store/notes-slice'
import { useAppDispatch, useAppSelector } from '@renderer/store/redux-store'

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const { notes, selectedNoteIndex } = useAppSelector((state) => state.notes)
  const dispatch = useAppDispatch()

  const handleNoteSelect = (index: number) => {
    dispatch(setSelectedNoteIndex(index))
    onSelect?.()
  }

  return {
    notes,
    selectedNoteIndex,
    handleNoteSelect
  }
}
