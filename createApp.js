const fs = require("fs-extra");
const chalk = require("chalk");
const envinfo = require("envinfo");
const utils = require("./utils");
const { exec } = require("child_process");
const validate = require("./validate");

function createAppDir(dir) {
    try {
        fs.mkdirSync(dir);
        return true;
    } catch (err) {
        utils.print(err);
    }
}

function copyFiles(dir) {
    try {
        fs.copySync(__dirname + "/template", dir);
        return true;
    } catch (err) {
        utils.print(err);
    }
}

function installPKG(pkg, name) {
    exec(`cd ${name} && ${pkg} install`, (err, stdout) => {
        if (err) {
            return utils.print(err);
        } else {
            utils.print(stdout);
            utils.print("\n" +
                "Thank you for chosing Glaciary.JS to create your new API\n\n" +
                "To start the api make sure you have glaciary installed as global " +
                "(use npm install glaciary -g)\n" + `run ${chalk.green('cd ' + name)} ` + `then ${chalk.green('npm start')}\n` +
                "\n\nEnjoy building your new API :D"
            )
        }
    });
}

async function getPkgManager(name) {

    const YarnInfo = await envinfo.helpers.getYarnInfo();
    const res = YarnInfo.find((element) => element === "Not Found");

    if (res === "Not Found") {
        installPKG("npm", name);
    } else {
        installPKG("yarn", name);
    }
}

function createApp(cwd, name) {
    let dir = cwd + `\\${name}`;
    console.clear();
    utils.print(`Creating a new Glaciary.JS project in ${chalk.green(dir)}\n\n`);
    utils.print("Creating app folder...\n");
    if (createAppDir(dir)) {
        utils.print("Successfully created the app folder\n");
        utils.print(`Copying files from container to ${chalk.green(dir)}\n`);
        if (copyFiles(dir)) {
            utils.print(`\n\nApp project files successfully placed in ${chalk.green(dir)}\n\n`);
            getPkgManager(name);
        }

    }
}

exports.handle = function (name, cwd) {
    if (validate.app(cwd, name)) {
        createApp(cwd, name);
    }
}
