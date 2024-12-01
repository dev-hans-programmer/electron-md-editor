import { notesMock } from '@renderer/store/mocks'
import { isEmpty } from 'lodash'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { NotePreview } from './note-preview'

export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const NotePreviewList = ({ className, ...props }: NotePreviewListProps) => {
  if (!notesMock) return null

  if (isEmpty(notesMock)) {
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        <span>No Notes Yet!</span>
      </ul>
    )
  }

  return (
    <ul className={className} {...props}>
      {notesMock.map((note) => (
        <NotePreview key={note.title + note.lastEditTime} {...note} />
      ))}
    </ul>
  )
}
