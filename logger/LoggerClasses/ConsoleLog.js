import Log from "./Logger";

class ConsoleLog extends Log {
  constructor(data) {
    super({ type: "CONSOLE", data });
  }
}

export default ConsoleLog;
