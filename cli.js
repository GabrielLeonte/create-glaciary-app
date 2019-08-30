#!/usr/bin/env node

const cli = require("cac")("create-nuxt-app");
const cliparse = cli.parse();
const name = cliparse.args[0];
const cwd = process.cwd();


// Display help message when `-h` or `--help` appears.
cli.help();


// Display version number when `-v` or `--version` appears.
cli.version('1.0.0');


// Run createApp function
require("./createApp").handle(name, cwd);


