#!/usr/bin/env node

import { getCommand } from './commands'
import { execute } from './executions'

function run() {
  const command = getCommand()
  const { src, package: packFile, upgrade } = command.opts()
  execute(src, packFile, upgrade)
}

run()
