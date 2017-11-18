#!/usr/bin/env node

var fs = require('fs'),
  chalk = require('chalk'),
  exec = require('child_process').exec,
  dependencies = ['babel-core'],
  pkgs = ['preset', 'plugin'];

fs.readFile('.babelrc', 'utf-8', function (err, data) {
  if (err) {
    console.error(chalk.red(err.message))
  } else {
    var config = JSON.parse(data);
    while (pkgs.length) {
      var pkg = pkgs.pop();
      var temp = config[pkg + 's'].map(function (item) {
        return 'babel-' + pkg + '-' + item;
      });
      dependencies = dependencies.concat(temp);
    }
    var script = 'npm i ' + dependencies.join(' ') + ' --save';

    console.log(chalk.yellow('These deps should be installed: \n' + dependencies));

    exec(script, function (error, stdout, stderr) {

      console.log(stdout);
      console.log(chalk.green('installed complete'));

      if (error !== null) {
        console.error(chalk.red('exec error: ' + error));
      }
    })
  }
});