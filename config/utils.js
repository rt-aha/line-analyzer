const chalk = require('chalk');
const importantLog = (text) => chalk.blue.bold(text);
const errorLog = (text) => chalk.red.bold(text);

exports.importantLog = importantLog;
exports.errorLog = errorLog;
