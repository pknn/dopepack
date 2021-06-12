#!/usr/bin/env node

import { getCommand } from './commands'

function run() {
  const command = getCommand()
  console.log(command.opts())
}

run()
