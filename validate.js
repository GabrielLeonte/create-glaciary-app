const fs = require('fs-extra');
const chalk = require('chalk');
const validate = require('validate-npm-package-name');
const utils = require('./utils');


module.exports.app = function (cwd, name) {
    // Check if the name is not already used.
    if (fs.existsSync(cwd + `\\${name}`)) {
        console.clear();
        utils.print(`Project ${chalk.green(name)} already exists in ${chalk.green(cwd)}\n\n`)
    } else {
        let validation = validate(name); // Return a small analysis about name.
        if (validation.validForNewPackages && validation.validForOldPackages) {
            return true;
        } else {
            if (validation.warnings || validation.errors) {
                Object.keys(validation[Object.keys(validation)[2]]).forEach((stdout => {
                    return utils.print(chalk.red(validation[Object.keys(validation)[2]][stdout])); // Print any error/warning returned from name analysis.
                }));
            }

        }
    }
}