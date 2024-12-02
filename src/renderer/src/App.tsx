import { useEffect, useRef } from 'react'
import { ActionButtonsRow } from './components/action-button-row'
import { Content, RootLayout, Sidebar } from './components/app-layout'
import { DraggableTopBar } from './components/draggable-topbar'
import { FloatingNoteTitle } from './components/floating-note-title'
import MarkdownEditor from './components/markdown-editor'
import { NotePreviewList } from './components/note-preview-list'
import { useAppDispatch } from './store/redux-store'
import { setNotes } from './store/notes-slice'

function App(): JSX.Element {
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function fetchNotes() {
      try {
        const notes = await window.context.getNotes()
        dispatch(setNotes(notes.sort((a, b) => b.lastEditTime - a.lastEditTime)))
      } catch (err) {
        console.log('[ERROR]', err)
      }
    }
    void fetchNotes()
  }, [])

  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => contentContainerRef.current?.scroll(0, 0)

  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className='p-2'>
          <ActionButtonsRow className='flex justify-between mt-1' />
          <NotePreviewList className='mt-3 space-y-1' onSelect={resetScroll} />
        </Sidebar>
        <Content className='border-l bg-zinc-900/50 border-l-white/20'>
          <FloatingNoteTitle />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
