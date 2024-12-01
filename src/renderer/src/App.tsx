import { ActionButtonsRow } from './components/action-button-row'
import { Content, RootLayout, Sidebar } from './components/app-layout'
import { DraggableTopBar } from './components/draggable-topbar'
import { NotePreviewList } from './components/note-preview-list'

function App(): JSX.Element {
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className='p-2'>
          <ActionButtonsRow className='flex justify-between mt-1' />
          <NotePreviewList />
        </Sidebar>
        <Content className='border-l bg-zinc-900/50 border-l-white/20'>Content</Content>
      </RootLayout>
    </>
  )
}

export default App
