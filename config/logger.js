/*
 * custom-levels.js: Custom logger and color levels in winston
 *
 * (C) 2012, Nodejitsu Inc.
 *
 */
var winston = require('winston'),
	common = require('./common');
    fs = require( 'fs' );

var date = new Date();
	date = "" + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();

//
// Configs for logging mechanism
//
var config = {
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta'
  }
};

/**
 * need to create the folders for winston logging
 */
var dirs = common.winstonLogPath.split('/');
var newDir = "/";
for (var i = 0; i < dirs.length; i++) {
    if(dirs[i].length>0){
        newDir += dirs[i] + '/';
        
        try{
            fs.mkdirSync(newDir)
        }
        catch(ex){
            if(ex.code == 'EEXIST'){
                continue;
            }else{
                console.error("error creating winston log file=" + ex);
                //throw ex;
            }
        }
    }
}

var logger = module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
		//logs from error level to ... level
 	  level:'silly',
    }),
	new winston.transports.File({ filename: common.getEnvironment().path + common.winstonLogPath + 'logs' + date + '.log' }),  
	],
	exceptionHandlers: [
	new winston.transports.File({ filename:  common.getEnvironment().path + common.winstonLogPath + 'exceptions' + date + '.log' })
  ],
  colors: config.colors
});

