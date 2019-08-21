const fs = require('fs-extra');
const chalk = require('chalk');
const envinfo = require('envinfo');
const utils = require('./utils');
const { exec } = require('child_process');
const validate = require('./validate');


exports.handle = function (cwd, name) {
    if (validate.app(name, cwd)) {
        createApp(cwd, name);
    }
}


function createApp(cwd, name) {
    let dir = cwd + `\\${name}`;
    console.clear();
    utils.print(`Creating a new Glaciary.JS project in ${chalk.green(dir)}\n\n`);
    utils.print(`Creating app folder...\n`);
    if (createAppDir(dir)) {
        utils.print('Successfully created the app folder\n');
        utils.print(`Copying files from container to ${chalk.green(dir)}\n`);
        if (copyFiles(dir)) {
            utils.print(`\n\nApp project files successfully placed in ${chalk.green(dir)}\n\n`);
            getPkgManager(name);
        }

    }
}


function createAppDir(dir) {
    fs.mkdirSync(dir);
    return true;
}


function copyFiles(dir) {
    fs.copy(__dirname + '/template', dir, err => {
        if (err) {
            return utils.print(err);
        }
    });
    return true;
}


async function getPkgManager(name) {

    const YarnInfo = await envinfo.helpers.getYarnInfo();
    const res = YarnInfo.find(element => element === "Not Found");

    if (res == "Not Found") {
        installPKG("npm", name);
    } else {
        installPKG("yarn", name);
    }
}


function installPKG(pkg, name) {
    exec(`cd ${name} && ${pkg} install`, (err, stdout) => {
        if (err) {
            return utils.print(err);
        } else {
            return utils.print(stdout);
        }
    });
}