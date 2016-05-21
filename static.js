'use strict';
module.exports = function(server) {
  server.register(require('inert'), function(err) {
    if (err) {
      throw err;
    }
		
    server.route({
      method: 'GET',
      path: '/node_modules/{param*}',
      handler: {
        directory: {
          path: __dirname + '/node_modules',
          listing: false
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/app/{param*}',
      handler: {
        directory: {
          path: __dirname + '/app',
          listing: false
        }
      }
    });
  });
};
