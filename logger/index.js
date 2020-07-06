import Log from "./LoggerClasses/Logger";
import { ErrorHandler } from "./Handlers/ErrorHandler";
import { ConsoleHandler } from "./Handlers/ConsoleHandler";

export const Tracker = () => {
  const init = (key) => {
    ErrorHandler().init();
    ConsoleHandler().init();
  };
  return {
    init: init,
    getLogCount: () => Log.getLogCount(),
    getLogData: () => Log.getLogData(),
  };
};
