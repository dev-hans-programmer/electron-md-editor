import { FaRegTrashCan } from 'react-icons/fa6'
import { ActionButton, ActionButtonProps } from './action-button'
import { useAppDispatch, useAppSelector } from '@renderer/store/redux-store'
import { deleteNote } from '@renderer/store/notes-slice'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const dispatch = useAppDispatch()

  const { selectedNoteIndex, notes } = useAppSelector((state) => state.notes)

  const handleDelete = async () => {
    if (selectedNoteIndex === null) return
    const selectedNote = notes[selectedNoteIndex]
    const hasDeleted = await window.context.deleteNote(selectedNote.title)
    dispatch(deleteNote(hasDeleted))
  }

  return (
    <ActionButton onClick={handleDelete} {...props}>
      <FaRegTrashCan className='w-4 h-4 text-zinc-300' />
    </ActionButton>
  )
}
