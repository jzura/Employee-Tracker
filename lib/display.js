const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

const initializeDisplay = () => {
    clear();
    console.log(
        chalk.yellow(
            figlet.textSync('EMPLOYEE MANAGEMENT SYSTEM', { horizontalLayout: 'full' })
        )
    );
}

module.exports = {
    initializeDisplay
}