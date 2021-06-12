import consola from 'consola'
import { toRelativePath, toUpgradedVersion, toVersionString } from './helpers/Misc'
import { UpgradeOption } from './models/CommandOptions'
import { getCurrentVersion } from './services/PackageServices'

const upgradeSemanticVersion = (packFilePath: string, upgradeOption: UpgradeOption): void => {
  consola.start('Starting Semantic Version Upgrade Process')
  const currentVersion = getCurrentVersion(packFilePath)
  const upgradedVersion = toUpgradedVersion(currentVersion, upgradeOption)
  consola.info(`Upgrading from ${toVersionString(currentVersion)} -> ${toVersionString(upgradedVersion)}`)
}

export const execute = (sourcePath: string, packFilePath: string, upgradeOption: UpgradeOption): void => {
  const packFileRelativePath = toRelativePath(packFilePath)
  upgradeSemanticVersion(packFileRelativePath, upgradeOption)
  console.log(sourcePath, packFileRelativePath, upgradeOption)
}
