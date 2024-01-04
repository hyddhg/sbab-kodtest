/* eslint-disable no-console */
export enum LogLevel {
  Information = "information",
  Warning = "warning",
  Error = "error",
  Off = "off",
}

/**
 * A logger to the console with a max log level
 * limiter. It won't log if the max log level is too low.
 * It won't log if the log level is set to off.
 * @param logLevel The log level you want to log on.
 * @param message The text message to send.
 * @param process.env.LOG_LEVEL The max log level.
 */
const Logger = (logLevel: LogLevel, message: string): void => {
  let maxLogLevel = LogLevel.Error;

  switch (process.env.LOG_LEVEL) {
    case LogLevel.Error:
      maxLogLevel = LogLevel.Error;
      break;
    case LogLevel.Warning:
      maxLogLevel = LogLevel.Warning;
      break;
    case LogLevel.Information:
      maxLogLevel = LogLevel.Information;
      break;
    case LogLevel.Off:
      maxLogLevel = LogLevel.Off;
      break;
    default:
      maxLogLevel = LogLevel.Error;
      break;
  }

  if (maxLogLevel === LogLevel.Off) {
    return;
  }

  switch (logLevel) {
    case LogLevel.Error:
      console.error(message);
      break;
    case LogLevel.Warning:
      if (maxLogLevel !== LogLevel.Error) {
        console.warn(message);
      }
      break;
    case LogLevel.Information:
      if (maxLogLevel === LogLevel.Information) {
        console.info(message);
      }
      break;
    default:
      console.log(message);
      break;
  }
};
export default Logger;
