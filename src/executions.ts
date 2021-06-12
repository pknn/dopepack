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
import { attemptPublish, clearTempDirectory, createTempDirectory } from './services/PublishService'

const upgradeSemanticVersion = (packFilePath: string, upgradeOption: UpgradeOption): void => {
  consola.start('Semantic version upgrade process started')
  const packFileRelativePath = toRelativePath(packFilePath)
  try {
    const currentVersion = getCurrentVersion(packFileRelativePath)
    const upgradedVersion = toUpgradedVersion(currentVersion, upgradeOption)
    consola.info(`Upgrading from ${toVersionString(currentVersion)} -> ${toVersionString(upgradedVersion)}`)
    createBackupPackJson(packFileRelativePath)
    setNewVersion(packFileRelativePath, upgradedVersion)
    consola.success(`Finished Semantic version upgrade process`)
    if (upgradeOption === 'dry') {
      consola.success('CLI was run with "dry" option, will not continue with publication process')
      clearBackupPackJson(packFileRelativePath)
      process.exit(0)
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      consola.error('Semantic version upgrade process failed:', `Cannot find file ${packFileRelativePath}`)
    } else {
      consola.error('Semantic version upgrade process failed with Unknown Error:\n', error)
    }
  }
}

const rollBackSemanticVersion = (packFilePath: string): void => {
  consola.start('Semantic Version Rollback Process Started')
  const packFileRelativePath = toRelativePath(packFilePath)
  const currentVersion = getCurrentVersion(packFileRelativePath)
  const rollbackedVersion = getCurrentVersion(getBackupPath(packFileRelativePath))
  restoreBackupPackJson(packFileRelativePath)
  consola.success(`Rollbacked from ${toVersionString(currentVersion)} -> ${toVersionString(rollbackedVersion)}`)
}

const publishPackage = (sourcePath: string, packFilePath: string): void => {
  consola.start('NPM Registry publication process')
  const packFileRelativePath = toRelativePath(packFilePath)
  try {
    consola.info('Creating temporary directory for publication')
    createTempDirectory(sourcePath, packFilePath)
    consola.info('Attempting to publish package')
    attemptPublish()
    consola.success('Finished NPM Registry publication process')
  } catch (error) {
    consola.error('Package publication failed:', error)
    consola.info('Rolling back version')
    rollBackSemanticVersion(packFilePath)
  } finally {
    consola.info('Clearing package backup')
    clearBackupPackJson(packFileRelativePath)
    consola.info('Clearing temporary directory')
    clearTempDirectory()
  }
}

export const execute = (sourcePath: string, packFilePath: string, upgradeOption: UpgradeOption): void => {
  upgradeSemanticVersion(packFilePath, upgradeOption)
  publishPackage(sourcePath, packFilePath)
}
