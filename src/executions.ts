import { toUpgradedVersion } from './helpers/Misc'
import { UpgradeOption } from './models/CommandOptions'
import { getCurrentVersion } from './services/PackageServices'

export const execute = (sourcePath: string, packFilePath: string, upgradeOption: UpgradeOption): void => {
  const currentVersion = getCurrentVersion(packFilePath)
  console.log(toUpgradedVersion(currentVersion, upgradeOption))
  console.log(sourcePath, packFilePath, upgradeOption)
}
