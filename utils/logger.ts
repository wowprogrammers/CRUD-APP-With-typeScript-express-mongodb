import winston from 'winston';

// Define log levels and format
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5,
};

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  verbose: 'cyan',
  debug: 'blue',
  silly: 'magenta',
});

// Create a logger
const logger = winston.createLogger({
  levels: logLevels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
    new winston.transports.File({ filename: 'combined.log' }), // Log everything else to another file
  ],
});

export default logger;
