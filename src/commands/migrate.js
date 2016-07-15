import fs from 'fs';
import path from 'path';
import Umzug from 'umzug';

import { MigratorConfig } from '../migrator_config';
import { Injector } from '../injector';

export var migrate = function(params) {

  // Initialize the injector
  // This should just be an external package at some point
  let injector = new Injector();

  // Load project specific dependencies if it has it
  let dependenciesPath = path.join(process.cwd(), 'dependencies.js');
  fs.stat(dependenciesPath, function(err, stats) {

    if(!err && stats.isFile()) {
      // Let project specific module add its dependencies
      let dependencies = require(dependenciesPath);
      // Pass the injector so that it can declare a dependency
      dependencies(injector);
    }

    // When the injector is ready, run migrations
    injector.ready().then(function() {
      //let umzugStorage = require(path.join(process.cwd(), 'umzug.json'));
      var migratorConfig = new MigratorConfig({
        env: params.env,
        dependencies: injector,
        run: params.run
      });
      var umzug = new Umzug(migratorConfig);
      var options = {};

      if(params.to) {
        options.to = params.to;
      }

      // Dry run migrations by default unless --run is passed
      umzug[params.direction](options).then(function() {
        console.log('Ran all pending migrations');
        process.exit(0);
      });
    });
  });
};

export var execute = function(yargs, argv) {
  argv = yargs
    .option('direction', {
      choices: ['up', 'down'],
      describe: 'up or down',
      demand: true
    })
    .option('to', {
      describe: 'migrate to the specified migration'
    })
    .option('env', {
      default: 'development',
      describe: 'run against the specified environment'
    })
    .option('run', {
      default: false,
      describe: 'actually run the migration'
    })
    .argv;

  migrate({
    direction: argv.direction,
    to: argv.to,
    env: argv.env,
    run: argv.run
  });
};
