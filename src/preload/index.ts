/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { contextBridge } from 'electron'
const context = {
  locale: navigator.language
}
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('context', context)
  } catch (error) {
    console.error(error)
  }
}
