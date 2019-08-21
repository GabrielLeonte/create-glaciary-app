const fs = require('fs-extra');
const chalk = require('chalk');
const validate = require('validate-npm-package-name');
const envinfo = require('envinfo');
const utils = require('./utils');
const { exec } = require('child_process');


exports.handle = function (name, cwd) {
    let validation = validate(name);
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
            getPkgManager(dir);
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


async function getPkgManager(dir) {
    const isyarn = await envinfo.helpers.getYarnInfo();
    const res = isyarn.find(element => element === "Not Found");
    if (res == "Not Found") {
        installPKG("npm", dir);
    } else {
        installPKG("yarn", dir);
    }
}


function installPKG(pkg, dir) {
    if (pkg === "npm") {
        exec(`cd `,(error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    } else if (pkg === "yarn") {
        console.log('yarn');
    }
}
