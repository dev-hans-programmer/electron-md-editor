// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ElectronAPI } from '@electron-toolkit/preload'

interface Context {
  getName: () => string
}

declare global {
  interface Window {
    context: Context
  }
}