import { Version } from '../models/Version'
import { getOr } from './Undefined'

export const fromVersionString = (versionString: string): Version => {
  const [major, minor, patch] = versionString.split('.').map((v) => parseInt(v))
  const getOrZero = getOr(0)

  return {
    major: getOrZero(major),
    minor: getOrZero(minor),
    patch: getOrZero(patch),
  }
}

export const toVersionString = (version: Version): string =>
  Object.values(version)
    .map((v) => v.toString())
    .join('.')

export const toPrettyJsonString = (object: Record<string, unknown>): string => JSON.stringify(object, (_, v) => v, 2)
