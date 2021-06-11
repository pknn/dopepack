#!/usr/bin/env node

import { getCommand } from './commands'

function exec() {
  const command = getCommand()
  console.log(command.opts())
}

exec()
