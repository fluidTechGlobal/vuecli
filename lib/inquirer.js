const inquirer = require('inquirer');
const files  = require('./files');
const chalk = require('chalk');

module.exports = {

  askGithubCredentials: () => {
    const questions = [
      {
        name: 'username',
        type: 'input',
        message: 'Enter your GitHub username or e-mail address:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your username or e-mail address.';
          }
        }
      },
      {
        name: 'password',
        type: 'password',
        message: 'Enter your password:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your password.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  vuexFolder: () => {
    console.log(chalk.green('INTRUCTIONS!'));
    console.log(chalk.green('All variable names should be separated with an underscore!'));
    console.log(chalk.yellow('\t' + 'e.g!'));
    console.log(chalk.yellow('\t\t' + 'first name/firstname/FIRSTNAME/FIRST_NAME' + '\t\t' + 'should be : '));
    console.log(chalk.gray('\t\t\t\t\t' + 'First_Name' + '\t\t\t' + 'for variable 1'));
    console.log(chalk.gray('\t\t\t\t\t' + 'first_name' + '\t\t\t' + 'for variable 2'));
    const questions = [
      {
        name: 'folder',
        type: 'input',
        message: 'Enter folder name:',
        validate: function( value ) {
          if (value.length) {
            if (files.directoryExists(value)) {
              console.log(chalk.red('\n' + 'That folder name is not unique!'));
              return false;
            } else {
              return true;
            }
          } else {
            return 'Please enter folder name.';
          }
        }
      },
      {
        name: 'capital_variable',
        type: 'input',
        message: 'Variable 1 (Enter singular variable name starting with a capital letter):',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter singular variable name starting with a capital letter.';
          }
        }
      },
      {
        name: 'small_variable',
        type: 'input',
        message: 'Variable 2 (Enter plural variable name in small letters):',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter plural variable name in small letters.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
}