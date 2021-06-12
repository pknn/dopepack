import consola from 'consola'
import { toRelativePath, toUpgradedVersion, toVersionString } from './helpers/Misc'
import { UpgradeOption } from './models/CommandOptions'
import { getCurrentVersion, setNewVersion } from './services/PackageServices'

const upgradeSemanticVersion = (packFilePath: string, upgradeOption: UpgradeOption): void => {
  consola.start('Semantic Version Upgrade Process')
  try {
    const currentVersion = getCurrentVersion(packFilePath)
    const upgradedVersion = toUpgradedVersion(currentVersion, upgradeOption)
    consola.info(`Upgrading from ${toVersionString(currentVersion)} -> ${toVersionString(upgradedVersion)}`)
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

export const execute = (sourcePath: string, packFilePath: string, upgradeOption: UpgradeOption): void => {
  const packFileRelativePath = toRelativePath(packFilePath)
  upgradeSemanticVersion(packFileRelativePath, upgradeOption)
  console.log(sourcePath, packFileRelativePath, upgradeOption)
}
