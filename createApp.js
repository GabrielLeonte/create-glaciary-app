const fs = require('fs-extra');
const chalk = require('chalk');
const validate = require('validate-npm-package-name');
const utils = require('./utils');


exports.handle = function (name, cwd) {
    let validation = validate(name);
    console.log(validation)
    if (validation.validForNewPackages && validation.validForOldPackages) {
        console.clear();
        utils.print(`Creating a new Glaciary.JS project in ${chalk.green(cwd + `\\${name}`)}\n\n`);
        createApp(cwd, name);
    } else {
        if (validation.warnings) {
            Object.keys(validation.warnings).forEach((warn => {
                utils.print(chalk.yellow(validation.warnings[warn]));
            }))
        }
        if (validation.errors) {
            Object.keys(validation.errors).forEach((err => {
                utils.print(chalk.red(validation.errors[err]));
            }))
        }

    }
}


function createApp(cwd, name) {
    let dir = cwd + `\\${name}`;
    utils.print(`Creating app folder...`);
    if (createAppDir(dir)) {

        utils.print('Successfully created the app folder');

        if (copyFiles(dir)) {
            utils.print(`\n\nApp project files successfully placed in ${chalk.green(dir)}\n\n`);
        }

    }
}


function createAppDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        return true;
    }

}


function copyFiles(dir) {
    fs.copy(__dirname + '/template', dir, err => {
        if (err) {
            return utils.print(err);
        }
    });
    return true;
}

function installPKG(dir){
    
}