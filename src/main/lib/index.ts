import { homedir } from 'os'
import { appDirName, welcomeNoteFilename } from '@shared/constant'
import { ensureDir, readdir, readFile, remove, stat, writeFile } from 'fs-extra'
import { NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import path from 'path'

export const getRootDir = () => `${homedir()}/${appDirName}`

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: 'utf-8',
    withFileTypes: false
  })

  const notes = notesFileNames.filter((note) => note.endsWith('.md'))
  if (notes.length === 0) {
    // create welcome note
    // create the welcome not
    await writeFile(`${rootDir}/${welcomeNoteFilename}`, '# Hello NoteHans', { encoding: 'utf-8' })

    notes.push(welcomeNoteFilename)
  }

  return Promise.all(notes.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${fileName}`)

  return {
    title: fileName.replace(/\.md/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (fileName) => {
  const rootDir = getRootDir()

  return readFile(`${rootDir}/${fileName}.md`, { encoding: 'utf-8' })
}

export const writeNote: WriteNote = async (fileName, content) => {
  const rootDir = getRootDir()

  await writeFile(`${rootDir}/${fileName}.md`, content, { encoding: 'utf-8' })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Mardown', extensions: ['md'] }]
  })

  if (canceled || !filePath) return false

  const { name: fileName, dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      title: 'Failed',
      type: 'error',
      message: 'All notes must be saved under ' + rootDir
    })
    return false
  }

  await writeFile(filePath, '')
  return fileName
}

export const deleteNote: DeleteNote = async (filename) => {
  const rootDir = getRootDir()

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete note',
    message: `Are you sure you want to delete ${filename}?`,
    buttons: ['Delete', 'Cancel'], // 0 is Delete, 1 is Cancel
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info('Note deletion canceled')
    return false
  }

  console.info(`Deleting note: ${filename}`)
  await remove(`${rootDir}/${filename}.md`)
  return true
}
