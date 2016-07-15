import fs from 'fs';
import path from 'path';

import { MigratorConfig } from '../migrator_config';

export function generateDatePrefix(date) {
  return date.getTime();
};

export var generate = function(params) {
  let migratorConfig = new MigratorConfig();

  const newMigrationTemplate =
`module.exports = {
  up: function (cb) {
    cb();
  },

  down: function (cb) {
    cb();
  }
};\n`;

  let migrationsPath = path.resolve(path.join(migratorConfig.migrations.path));
  let migrationFilePath =
    `${migrationsPath}/${generateDatePrefix(new Date())}_${params.name}.js`;

  fs.writeFile(migrationFilePath, newMigrationTemplate, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log(`${migrationFilePath} generated`);
  });
};

export var execute = function(yargs, argv) {
  argv = yargs
    .option('name', {
      describe: 'descriptive name for the migration file',
      demand: true,
      type: 'string'
    })
    .argv;

  if(argv.name.length === 0) {
    console.log('You must provide a valid name for the migration');
    process.exit(1);
  }

  generate({
    name: argv.name
  });
};
