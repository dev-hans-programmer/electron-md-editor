import { FaRegTrashCan } from 'react-icons/fa6'
import { ActionButton, ActionButtonProps } from './action-button'
import { useAppDispatch } from '@renderer/store/redux-store'
import { deleteNote } from '@renderer/store/notes-slice'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const dispatch = useAppDispatch()
  const handleDelete = async () => {
    dispatch(deleteNote())
  }

  return (
    <ActionButton onClick={handleDelete} {...props}>
      <FaRegTrashCan className='w-4 h-4 text-zinc-300' />
    </ActionButton>
  )
}
