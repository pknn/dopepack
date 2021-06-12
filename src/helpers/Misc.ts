import { UpgradeOption } from '../models/CommandOptions'
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

const updateSemanticlyByIndex = (value: number, currentIndex: number, targetIndex: number) =>
  currentIndex <= targetIndex ? (currentIndex === targetIndex ? value + 1 : value) : 0

export const toUpgradedVersion = (currentVersion: Version, option: UpgradeOption): Version => {
  if (option === 'dry') return currentVersion

  const versionKeys = Object.keys(currentVersion).map((k) => k as UpgradeOption)
  const targetIndex = versionKeys.findIndex((k) => k === option)
  const upgradedVersion = Object.entries(currentVersion).map(([k, v], currentIndex) => [
    k,
    updateSemanticlyByIndex(v, currentIndex, targetIndex),
  ])

  return Object.fromEntries(upgradedVersion) as Version
}
