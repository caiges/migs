module.exports = {
  up: function(cb) {
    if(this.env === 'test') {
      var permissionistSandbox = this.injector.get('permissionistSandbox');
      permissionistSandbox.getRolesForApp('2693c177-4de6-4626-b3eb-b989025320af', function(err, result) {
        console.log('Roles: ', result);
        cb();
      });
    }
  },

  down: function(cb) {
    console.log('down');
    cb();
  }
};
