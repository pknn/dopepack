import { Version } from '../models/Version'
import { getOr } from './Undefined'

export function fromVersionString(versionString: string): Version {
  const [major, minor, patch] = versionString.split('.').map((v) => parseInt(v))
  const getOrZero = getOr(0)

  return {
    major: getOrZero(major),
    minor: getOrZero(minor),
    patch: getOrZero(patch),
  }
}
