import Bluebird from 'bluebird';
import path from 'path';

export var MigratorConfig = function(options) {
  return {
    // The storage.
    // Possible values: 'json', 'sequelize', an object
    storage: options.run ? 'json' : path.join(__dirname, '/storages/dry.js'),

    // The options for the storage.
    // Check the available storages for further details.
    storageOptions: {},

    // The logging function.
    // A function that gets executed everytime migrations start and have ended.
    logging: false,

    // The name of the positive method in migrations.
    upName: 'up',

    // The name of the negative method in migrations.
    downName: 'down',

    migrations: {
      // The params that gets passed to the migrations.
      // Might be an array or a synchronous function which returns an array.
      params: [],

      // The path to the migrations directory.
      path: path.join(process.cwd(), 'migrations'),

      // The pattern that determines whether or not a file is a migration.
      pattern: /^.*.js$/,

      wrap: function(func) {
        return Bluebird.promisify(func.bind({
          env: options.env,
          dependencies: options.dependencies || null,
          run: options.run
        }));
      }
    }
  };
};
