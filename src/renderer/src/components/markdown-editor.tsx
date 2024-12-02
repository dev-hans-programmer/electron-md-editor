import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  codeBlockPlugin
} from '@mdxeditor/editor'
import useMarkdownEditor from '@renderer/hooks/use-markdown-editor'
import { useAppDispatch } from '@renderer/store/redux-store'

const MarkdownEditor = () => {
  const { selectedNote, handleSave, editorRef, handleBlur } = useMarkdownEditor()
  const dispatch = useAppDispatch()

  if (!selectedNote) return null

  const handleChange = (value: string) => {
    dispatch(handleSave(value))
  }

  const handleBlurWrapper = () => {
    dispatch(handleBlur())
  }

  return (
    <MDXEditor
      ref={editorRef}
      key={selectedNote.title}
      markdown={selectedNote.content}
      onBlur={handleBlurWrapper}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        codeBlockPlugin()
      ]}
      onChange={handleChange}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
    />
  )
}

export default MarkdownEditor
