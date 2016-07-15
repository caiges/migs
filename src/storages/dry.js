const _ = require('lodash');
const Bluebird = require('bluebird');
const fs = require('fs');
const path = require('path');
const redefine = require('redefine');

module.exports = redefine.Class({
  constructor: function (options) {
    this.options = options || {};

    this.options.storageOptions = _.assign({
      path: path.resolve(process.cwd(), 'umzug.json'),
    }, this.options.storageOptions || {});
  },

  logMigration: function () {
    return Bluebird.resolve();
  },

  unlogMigration: function () {
    return Bluebird.resolve();
  },

  executed: function () {
    var filePath = this.options.storageOptions.path;
    var readfile = Bluebird.promisify(fs.readFile);

    return readfile(filePath)
      .catch(function () { return '[]'; })
      .then(function (content) {
        return JSON.parse(content);
      });
  }
});
