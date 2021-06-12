import fs from 'fs-extra'
import path from 'path'
import ChildProcess from 'child_process'
import { toRelativePath } from '../helpers/Misc'

export const createTempDirectory = (srcPath: string, packJsonPath: string): void => {
  const destPath = toRelativePath('tmp')
  fs.copySync(srcPath, destPath)
  fs.copyFileSync(packJsonPath, path.join(destPath, packJsonPath))
}

export const clearTempDirectory = (): void => {
  const destPath = toRelativePath('tmp')
  fs.rmSync(destPath, {
    recursive: true,
    force: true,
  })
}

export const attemptPublish = (): void => {
  const destPath = toRelativePath('tmp')
  ChildProcess.execSync(`cd ${destPath} && yarn publish`)
}
