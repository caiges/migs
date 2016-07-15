import yargs from 'yargs';

yargs.usage('pay-migrator <command>')
  .command('migrate', 'Run all pending migrations or up/down to a specific migration', require('./commands/migrate').execute)
  .command('generate', 'Create a new migration file with the given suffix', require('./commands/generate').execute)
  .help('h')
  .alias('h', 'help');

var argv = yargs.argv;

// Display help if no command is specified
var command = argv._[0];

if(['migrate', 'generate'].indexOf(command) === -1) {
  yargs.showHelp();
}
