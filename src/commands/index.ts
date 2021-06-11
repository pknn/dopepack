import commander, { Command, Option } from 'commander'
import { UpgradeOptions } from '../models/CommandOptions'

export const getCommand = (): commander.Command => {
  const command = new Command('dopepub')
  command.addOption(new Option('-s, --src <source_dir>', 'built source to publish').default('dist', 'dist/ directory'))
  command.addOption(
    new Option('-u, --upgrade <options>', 'version upgrading strategy')
      .choices([...UpgradeOptions])
      .makeOptionMandatory(),
  )
  command.addOption(
    new Option('-p, --package <package.json>', 'override package.json location').default('package.json'),
  )
  command.addOption(new Option('-o, --override <version>', 'override version'))
  return command.parse()
}
