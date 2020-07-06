import Log from "./Logger";

class ErrorLog extends Log {
  constructor({ message, source, lineno, colno, error }) {
    let data = {
      message,
      source,
      lineno,
      colno,
      stack: error && error.stack,
      errorName: error && error.name,
    };
    super({ type: "ERROR", data });
  }
}

export default ErrorLog;
