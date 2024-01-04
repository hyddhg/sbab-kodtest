import { describe, expect, test, jest } from "@jest/globals";
import Logger, { LogLevel } from "./logger";

describe("Logger", () => {
  const consoleSpyInfo = jest
    .spyOn(console, "info")
    .mockImplementation(() => {});
  const consoleSpyWarn = jest
    .spyOn(console, "warn")
    .mockImplementation(() => {});
  const consoleSpyError = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  it('calls Logger with "information" and "message"', () => {
    process.env.LOG_LEVEL = LogLevel.Information;
    const message = "test of logger with information";
    Logger(LogLevel.Information, message);

    expect(consoleSpyInfo).toHaveBeenCalledWith(message);
  });

  it('calls Logger with "warning" and "message"', () => {
    process.env.LOG_LEVEL = LogLevel.Information;
    const message = "test of logger with warning";
    Logger(LogLevel.Warning, message);

    expect(consoleSpyWarn).toHaveBeenCalledWith(message);
  });

  it('calls Logger with "error" and "message"', () => {
    process.env.LOG_LEVEL = LogLevel.Information;
    const message = "test of logger with error";
    Logger(LogLevel.Error, message);

    expect(consoleSpyError).toHaveBeenCalledWith(message);
  });

  it('calls Logger with log level "error" and env "error"', () => {
    process.env.LOG_LEVEL = LogLevel.Error;
    const message = "Ignored";
    Logger(LogLevel.Error, message);

    expect(consoleSpyError).toBeCalledTimes(1);
  });

  it('calls Logger with log level "warning" and env "error"', () => {
    process.env.LOG_LEVEL = LogLevel.Error;
    const message = "Ignored";
    Logger(LogLevel.Warning, message);

    expect(consoleSpyWarn).toBeCalledTimes(0);
  });

  it('calls Logger with log level "information" and env "error"', () => {
    process.env.LOG_LEVEL = LogLevel.Error;
    const message = "Ignored";
    Logger(LogLevel.Information, message);

    expect(consoleSpyInfo).toBeCalledTimes(0);
  });

  it('calls Logger with log level "error" and env "off"', () => {
    process.env.LOG_LEVEL = LogLevel.Off;
    const message = "Ignored";
    Logger(LogLevel.Error, message);

    expect(consoleSpyInfo).toBeCalledTimes(0);
  });
});
