import ErrorLog from "../LoggerClasses/ErrorLog";

export const ErrorHandler = () => {
  const init = () => {
    window.onerror = function (message, source, lineno, colno, error) {
      processErrorDetails({
        message,
        source,
        lineno,
        colno,
        error,
      });
    };
    window.addEventListener("error", function (event) {
      const { message, source, lineno, colno, error, filename } = event;
      processErrorDetails({
        message,
        source: source || filename,
        lineno,
        colno,
        error,
      });
    });
  };
  const processErrorDetails = (errDetails) => {
    new ErrorLog(errDetails);
  };
  return {
    init: init,
  };
};
