'use strict';
var Hapi = require('hapi');
var indexRoutes = require('./routes/indexRoutes');
const Chairo = require('chairo');
var staticContent = require('./static');
var Good = require('good');
var common = require('./config/common');
var logger = require('./config/logger');
var server = new Hapi.Server();
var options = {
common:common,
logger:logger
};

server.connection({
  port: 3333
});



var plugins = [{
  register: Good,
  options: {
    ops: {
      interval: 1000
    },
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          log: '*',
          response: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
}, {
  register: Chairo,
  options: {
    web: require('seneca-web')
  },
}];
server.register(plugins, (err) => {
  server.orders = [];
  var si = server.seneca;

  si.client({
    host: process.env.PROXY_HOST || common.host,
    port: process.env.FILE_PORT || common.FILE_PORT
  })


  staticContent(server);
  indexRoutes(server, options);
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);
  })
});
