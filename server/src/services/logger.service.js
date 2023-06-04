import winston from 'winston';
import ENV from '../../config/env.js';
import AppUtils from '../utils/apps.utils.js';
import FilesUtils from '../utils/files.utils.js';

const { format } = winston;

/**
  * Initiate.
  *
  * Initiate the logger service, create the enumerateErrorFormat and all the logger's transports.
  * @returns {object}
  */
const initiateLoggerService = () => {
  // Add transports are necessary.
  const transports = [];
  // Format the errors as enums.
  const enumerateErrorFormat = format((info) => {
    const errorInfo = info;
    if (errorInfo.message instanceof Error) {
      errorInfo.message = {
        message: info.message.message,
        stack: info.message.stack,
        ...info.message,
      };
    }
    if (errorInfo instanceof Error) {
      return {
        message: info.message,
        stack: info.stack,
        ...info,
      };
    }
    return errorInfo;
  });
  // Console logger transport.
  const consoleConfig = ENV.server.logging.console;
  if (consoleConfig.enabled) {
    console.log(`Console logging enabled for level: ${consoleConfig.level}`);
    transports.push(
      new winston.transports.Console({
        timestamp: true,
        level: consoleConfig.level,
        handleExceptions: true,
        format: format.combine(
          format.colorize({
            all: false,
            level: false,
            message: false,
          }),
          format.prettyPrint(),
          format.timestamp(),
          winston.format.printf((info) => `${info.level}: ${info.timestamp}: ${info.message}`),
        ),
      }),
    );
  }
  // File logger transport.
  const fileLogConfig = ENV.server.logging.file;
  if (fileLogConfig.enabled && !AppUtils.isProductionOrQA(ENV.server.env)) {
    console.log(`File logging enabled for level: ${fileLogConfig.level}`);
    const logDir = fileLogConfig.logDirectory;
    // Add the logs folder if it does not exist.
    FilesUtils.createDirectory(logDir);
    transports.push(
      new winston.transports.File({
        timestamp: true,
        level: fileLogConfig.level,
        name: 'app',
        filename: `${logDir}/app-${fileLogConfig.level}.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5MB.
        maxFiles: 5,
        tailable: true,
        format: format.combine(
          format.json(),
          format.prettyPrint(),
          format.timestamp(),
        ),
      }),
    );
  }
  return {
    transports,
    enumerateErrorFormat,
  };
};

// Initiate the logger service - Get the transports list and the enumerate.
const { transports, enumerateErrorFormat } = initiateLoggerService();

// Create the logger service instance by Winston with all the transports list and the enumerate.
const LoggerService = winston.createLogger({
  format: format.combine(
    enumerateErrorFormat(),
  ),
  transports,
  exitOnError: false,
});

export default LoggerService;
