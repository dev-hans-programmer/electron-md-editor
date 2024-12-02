import { ActionButton, ActionButtonProps } from './action-button'
import { LuFileSignature } from 'react-icons/lu'
import { useAppDispatch } from '@renderer/store/redux-store'
import { createNewNote } from '@renderer/store/notes-slice'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const dispatch = useAppDispatch()
  const handleCreation = async () => {
    const title = await window.context.createNote()

    if (title) dispatch(createNewNote(title))
  }

  return (
    <ActionButton onClick={handleCreation} {...props}>
      <LuFileSignature className='w-4 h-4 text-zinc-300' />
    </ActionButton>
  )
}
