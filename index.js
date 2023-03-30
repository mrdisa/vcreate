#!/usr/bin/env node

/**
 * vcreate
 * Create vue component from CLI
 *
 * @author Nikola Stankovic </>
 */

import initCli from './utils/init.js';
import cli from './utils/cli.js';
import fs from 'node:fs';
import process from 'node:process';
import path from 'path';
import { ComponentTemplate } from './templates/ComponentTemplate.js';
import chalk from 'chalk';

const input = cli.input;
const flags = cli.flags;
const { lang, sass } = flags;

(async () => {
  input.includes(`help`) && cli.showHelp(0);

  if (
    input.includes(`component`) ||
    input.includes('c') ||
    input.includes('view') ||
    input.includes('v')
  ) {
    // Determine the folder and file name for the new component
    const view = input.includes('view');
    const v = input.includes('v');
    const inputArr = input[1].split('.');
    let folderName = inputArr.slice(0, inputArr.length - 1).join('/');
    let componentName = inputArr[inputArr.length - 1];
    if (!componentName) {
      componentName = folderName;
      folderName = '';
    }
    componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1); // Make first letter uppercase
    const fileName = `${componentName}.vue`;

    // Determine the path where the component file should be created
    const baseDir = view || v ? 'src/views' : 'src/components';
    const folderPath = folderName ? path.join(baseDir, folderName) : baseDir;
    const filePath = folderName ? path.join(folderPath, fileName) : path.join(baseDir, fileName);

    // If folderName is not empty, we need to create the folder if it doesn't exist
    if (folderName) {
      try {
        fs.mkdirSync(path.join(baseDir, folderName), { recursive: true });
      } catch (error) {
        if (error.code !== 'EEXIST') {
          console.log(chalk.bgRed.white('ERROR'));
          console.log(
            `${chalk.red('ERROR:')} An error occurred while creating the folder: ${error.message}`
          );
          process.exit(1);
        }
      }
    } else if (baseDir) {
      // Checks if the baseDir (components | views) folder exists
      try {
        fs.mkdirSync(path.join(baseDir), { recursive: true });
      } catch (error) {
        if (error.code !== 'EEXIST') {
          console.log(chalk.bgRed.white('ERROR'));
          console.log(
            `${chalk.red('ERROR:')} An error occurred while creating the folder: ${error.message}`
          );
          process.exit(1);
        }
      }
    }

    // Check if the component file already exists
    if (fs.existsSync(filePath)) {
      console.log(chalk.bgRed.bold(' ERROR '));
      console.log(`${chalk.red('ERROR:')} The file ${filePath} already exists.`);
      process.exit(1);
    } else {
      // Create the component file
      fs.writeFileSync(filePath, ComponentTemplate(componentName, lang, sass));
      console.log(`${chalk.bgGreen.bold(' COMPONENT CREATED ')} 🎉`);
      console.log('\n');
      console.log(`${chalk.green.bold('PATH:')} ${filePath}`);
      console.log(`${chalk.green.bold('MESSAGE:')} Component ${componentName} created!`);
    }
  }

  if (input.length === 0) {
    initCli();
  }
})();
