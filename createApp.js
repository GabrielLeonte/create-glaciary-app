const fs = require('fs-extra');
const chalk = require('chalk');
const utils = require('./utils');


exports.handle = function (name, cwd) {
    if (name) {
        if (name.match(/[A-Z\W]/) == null) {
            console.clear();
            utils.print(`Creating a new Glaciary.JS project in ${chalk.green(cwd + `\\${name}`)}\n\n`);
            createApp(cwd, name);
        } else {
            utils.print(`Upper cases and special characters are not supported`);
        }
    } else {
        utils.print(`You have to enter a name for your app. \nUse ${chalk.green("create-glaciary-app name")}, where name is the name of your app.`);
    }
}



function createApp(cwd, name) {
    let dir = cwd + `\\${name}`;
    utils.print(`Creating app folder...`);
    if (createAppDir(dir)) {

        utils.print('Successfully created the app folder');

        if (copyFiles(dir)) {
            utils.print(`App project files successfully placed in ${chalk.green(dir)}`);
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