import ConsoleLog from "../LoggerClasses/ConsoleLog";

function overRideConsole() {
  window.console = (function (origConsole) {
    if (!window.console || !origConsole) {
      origConsole = {};
    }

    //make is debug configurable
    var isDebug = true;
    return {
      log: function () {
        this.processLog(arguments, "log");
        isDebug &&
          origConsole.log &&
          origConsole.log.apply(origConsole, arguments);
      },
      warn: function () {
        this.processLog(arguments, "warn");
        isDebug &&
          origConsole.warn &&
          origConsole.warn.apply(origConsole, arguments);
      },
      error: function () {
        this.processLog(arguments, "error");
        isDebug &&
          origConsole.error &&
          origConsole.error.apply(origConsole, arguments);
      },
      info: function () {
        this.processLog(arguments, "info");
        isDebug &&
          origConsole.info &&
          origConsole.info.apply(origConsole, arguments);
      },
      table: function () {
        origConsole.table && origConsole.table.apply(origConsole, arguments);
      },
      dir: function () {
        origConsole.dir && origConsole.dir.apply(origConsole, arguments);
      },
      processLog: function (newArgs, type) {
        let data = {
          consoleArgs: newArgs,
          type,
        };
        new ConsoleLog(data, type);
      },
    };
  })(window.console);
}

export const ConsoleHandler = () => {
  const init = () => {
    overRideConsole();
  };
  return {
    init: init,
  };
};
