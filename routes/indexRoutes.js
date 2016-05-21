'use strict';
module.exports = function(server, options) {
  const zlib = require('zlib');

  const handler = function(req, reply) {
    reply.view('index.ejs');
  };
    
  const saveOrderHandler = function(req, reply) {
    server.orders.push(req.payload);
    reply('Order saved');
  };
    
const getHistoricalOrderHandler = function(req, reply) {
    reply(server.orders);
  };
    

  const redirectHandler = function(req, reply) {
    reply.redirect('/');
  };

  server.register(require('vision'), function(err) {
    if (err) {
      throw err;
    }
    server.views({
      engines: {
        html: require('handlebars'),
        ejs: require('ejs')
      },
      path: __dirname + '/../app',
      compileOptions: {
        pretty: true
      }
    });

    server.route({
      method: 'GET',
      path: '/',
      handler: handler
    });
      
    server.route({
      method: 'POST',
      path: '/saveOrder',
      handler: saveOrderHandler
    });
      
    server.route({
      method: 'GET',
      path: '/getHistoricalOrder',
      handler: getHistoricalOrderHandler
    });


    server.route({ // Everything else
      method: 'GET',
      path: '/{p*}',
      handler: redirectHandler
    });
  });


}
