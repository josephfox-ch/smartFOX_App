import winston from 'winston';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'cyan',
  debug: 'blue',
  silly: 'rainbow'
};

winston.addColors(logColors);

const logger = winston.createLogger({
  level: process.env.LOGGING_LEVEL || 'info',
  levels: logLevels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: process.env.LOGGING_SERVICE_LABEL || 'SmartFOXHome-Service' },
  transports: [
   
    new winston.transports.File({
      filename: process.env.LOG_ERROR_FILE_PATH || 'logs/error.log',
      level: 'error'
    }),
   
    new winston.transports.File({
      filename: process.env.LOG_COMBINED_FILE_PATH || 'logs/combined.log'
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: process.env.LOG_EXCEPTION_FILE_PATH || 'logs/exception.log'
    })
  ]
});


if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    )
  }));
}

export default logger;


