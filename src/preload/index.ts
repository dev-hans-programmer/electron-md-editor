/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { contextBridge } from 'electron'
const context = {
  getName: () => 'Hasan Ali'
}
if (process.contextIsolated) {
  console.log('PROCESS ENABLED')
  try {
    contextBridge.exposeInMainWorld('context', context)
  } catch (error) {
    console.error(error)
  }
}
