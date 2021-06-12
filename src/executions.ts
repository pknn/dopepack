import consola from 'consola'
import { getBackupPath, toRelativePath, toUpgradedVersion, toVersionString } from './helpers/Misc'
import { UpgradeOption } from './models/CommandOptions'
import {
  clearBackupPackJson,
  createBackupPackJson,
  getCurrentVersion,
  restoreBackupPackJson,
  setNewVersion,
} from './services/PackageServices'

const upgradeSemanticVersion = (packFilePath: string, upgradeOption: UpgradeOption): void => {
  consola.start('Semantic Version Upgrade Process Started')
  try {
    const currentVersion = getCurrentVersion(packFilePath)
    const upgradedVersion = toUpgradedVersion(currentVersion, upgradeOption)
    consola.info(`Upgrading from ${toVersionString(currentVersion)} -> ${toVersionString(upgradedVersion)}`)
    createBackupPackJson(packFilePath)
    setNewVersion(packFilePath, upgradedVersion)
    consola.success(`Finished Semantic Version Upgrade Process`)
  } catch (error) {
    if (error.code === 'ENOENT') {
      consola.error('Semantic Version Upgrade Process failed:', `Cannot find file ${packFilePath}`)
    } else {
      consola.error('Semantic Version Upgrade Process failed with Unknown Error:\n', error)
    }
  }
}

const rollBackSemanticVersion = (packFilePath: string): void => {
  consola.start('Semantic Version Rollback Process Started')
  const currentVersion = getCurrentVersion(packFilePath)
  const rollbackedVersion = getCurrentVersion(getBackupPath(packFilePath))
  restoreBackupPackJson(packFilePath)
  consola.success(`Rollbacked from ${toVersionString(currentVersion)} -> ${toVersionString(rollbackedVersion)}`)
}

export const execute = (sourcePath: string, packFilePath: string, upgradeOption: UpgradeOption): void => {
  const packFileRelativePath = toRelativePath(packFilePath)
  upgradeSemanticVersion(packFileRelativePath, upgradeOption)
  rollBackSemanticVersion(packFileRelativePath)
  console.log(sourcePath, packFileRelativePath, upgradeOption)
}
