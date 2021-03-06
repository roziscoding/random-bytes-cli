#!/usr/bin/env node

import crypto from 'crypto'
import * as commander from 'commander'

const pkg = require('../package.json')

const program = new commander.Command()

program
  .name('rdb')
  .version(pkg.version)
  .argument('<size>', 'number of bytes to generate', (x) => {
    const int = parseInt(x, 10)

    if (isNaN(int)) throw new Error('size must be a number')

    return int
  })
  .addArgument(
    new commander.Argument(
      '<format>',
      'format in wich the bytes should be printed'
    ).choices(['hex', 'base64'])
  )
  .action((size: number, format: 'hex' | 'base64') => {
    console.log(crypto.randomBytes(size).toString(format))
  })

program.parse(process.argv)
