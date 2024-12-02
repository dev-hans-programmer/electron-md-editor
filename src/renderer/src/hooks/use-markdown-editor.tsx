import { MDXEditorMethods } from '@mdxeditor/editor'
import { ExtendedNoteInfo, updateNote } from '@renderer/store/notes-slice'
import { useAppSelector } from '@renderer/store/redux-store'
import { NoteContent } from '@shared/models'
import { useEffect, useRef, useState } from 'react'
import { throttle } from 'lodash'

function useMarkdownEditor() {
  const [selectedNote, setSelectedNote] = useState<ExtendedNoteInfo | null>(null)
  const editorRef = useRef<MDXEditorMethods>(null)

  const { notes, selectedNoteIndex } = useAppSelector((state) => state.notes)

  const handleSave = throttle(
    (newContent: NoteContent) => async (dispatch) => {
      try {
        if (!selectedNote) return
        // save to disc
        await window.context.writeNote(selectedNote.title, newContent)

        dispatch(updateNote())
      } catch (err) {
        console.log('ERROR', err)
      }
    },
    2000,
    {
      leading: false,
      trailing: true
    }
  )

  const handleBlur = () => async (dispatch) => {
    if (!selectedNote) return

    handleSave.cancel()

    const content = editorRef.current?.getMarkdown()

    if (content) {
      await window.context.writeNote(selectedNote.title, content)

      dispatch(updateNote())
    }
  }

  useEffect(() => {
    async function fetchNoteContent() {
      try {
        if (selectedNoteIndex !== null) {
          const { title, lastEditTime } = notes[selectedNoteIndex]

          const content = await window.context.readNote(title)

          setSelectedNote({
            title,
            lastEditTime,
            content
          })
        }
      } catch (err) {
        console.log('ERROR', err)
      }
    }
    void fetchNoteContent()
  }, [notes, selectedNoteIndex])

  return {
    selectedNote,
    handleSave,
    handleBlur,
    editorRef
  }
}

export default useMarkdownEditor
