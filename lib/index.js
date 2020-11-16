#!/usr/bin/env node

const readline = require("readline");
const shell = require('shelljs');

function remove(image = '<none>', tag = '<none>') {
    const info = shell.exec('docker images').split(/\s/).filter(it => it !== '');

    for (let idx = 0; idx < info.length; ++idx) {
        if (info[idx] === image && info[idx + 1] === tag && info[idx + 2].length === 12) {
            shell.exec('docker rmi ' + info[idx + 2]);
        }
    }
}

(function () {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("image, tag: ", function (answer) {
        const [image, tag] = answer.split(' ');
        remove(image, tag);
        rl.close();
    });

    rl.on("close", function () {
        process.exit();
    });
})();

