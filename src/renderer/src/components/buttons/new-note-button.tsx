import { useSetAtom } from 'jotai'
import { ActionButton, ActionButtonProps } from './action-button'
import { LuFileSignature } from 'react-icons/lu'
import { createNewNoteAtom } from '@renderer/store'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createNewNoteAtom)
  const handleCreation = async () => {
    createEmptyNote()
  }

  return (
    <ActionButton onClick={handleCreation} {...props}>
      <LuFileSignature className='w-4 h-4 text-zinc-300' />
    </ActionButton>
  )
}
