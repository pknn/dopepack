import fs from 'fs'
import { fromVersionString, toPrettyJsonString, toVersionString } from '../helpers/Misc'
import { Version } from '../models/Version'

const getPackJson = (packFilePath: string): Record<string, unknown> => {
  const packFile = fs.readFileSync(packFilePath, {
    encoding: 'utf8',
  })
  return JSON.parse(packFile)
}

export const getCurrentVersion = (packFilePath: string): Version => {
  const packJson = getPackJson(packFilePath)
  return fromVersionString(packJson.version as string)
}

export const setNewVersion = (packFilePath: string, newVersion: Version): void => {
  const packJson = getPackJson(packFilePath)
  const newVersionString = toVersionString(newVersion)
  packJson.version = newVersionString
  fs.writeFileSync(packFilePath, toPrettyJsonString(packJson))
}
