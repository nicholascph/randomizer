module.exports = {

  host: "localhost",
  /**
   * Seneca Options
   */
  senecaTimeout: 99999,
  /**
   * Seneca Listener & Clients
   */
  GREET_PORT: 9001,
  NUMBER_PORT: 9002,
  FILE_PORT: 9003,

  /**
   * Winston Logging Configurations
   */
  winstonLogPath: '/winston/logs/',

  /**
   * mongoDB Configurations
   */
	
  mongoDBConnection: 'mongodb://'+ (process.env.PROXY_HOST || 'localhost:27017') + '/secretlib', //localhost
//  mongoDBConnection: 'mongodb://'+ (process.env.PROXY_HOST || '192.168.5.91:27017') + '/secretlib', // 192.168.5.91 server
//  mongoDBConnection: 'mongodb://'+ (process.env.PROXY_HOST || '192.168.5.92:27017') + '/secretlib', // 192.168.5.92 server
  /* LOCALHOST */
  mongopath: '/data/backup/',
  getEnvironment: function() {
    if (process.platform == "win32") {
      return ({
        path: 'C:',
        mongodumpexe: 'C:/MongoDB/bin/mongodump',
        mongorestoreexe: 'C:/MongoDB/bin/mongorestore',
      })
    } else {
      return ({
        path: '',
        mongodumpexe: 'mongodump',
        mongorestoreexe: 'mongorestore'
      })
    }
  },

}
