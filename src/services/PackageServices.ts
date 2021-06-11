import fs from 'fs'
import { fromVersionString } from '../helpers/Misc'
import { Version } from '../models/Version'

export const getCurrentVersion = (packFilePath: string): Version => {
  const packFile = fs.readFileSync(packFilePath, {
    encoding: 'utf-8',
  })
  const packJson = JSON.parse(packFile)
  return fromVersionString(packJson.version)
}
